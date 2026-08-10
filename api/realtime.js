const DEFAULT_GITHUB_ORIGIN = 'https://shinobione.github.io';

function allowedOrigins(request) {
  const values = new Set([DEFAULT_GITHUB_ORIGIN, new URL(request.url).origin]);
  for (const value of String(process.env.ALLOWED_ORIGINS || '').split(',')) {
    const trimmed = value.trim();
    if (trimmed) values.add(trimmed.replace(/\/$/, ''));
  }
  return values;
}

function corsHeaders(request) {
  const origin = String(request.headers.get('origin') || '').replace(/\/$/, '');
  const allowed = allowedOrigins(request);
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Tutor-Token',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  if (origin && allowed.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }
  return { headers, ok: !origin || allowed.has(origin) };
}

function json(data, status, headers) {
  const next = new Headers(headers);
  next.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers: next });
}

function compactLearnerContext(value) {
  const source = value && typeof value === 'object' ? value : {};
  const reviewState = source.reviewState && typeof source.reviewState === 'object'
    ? Object.fromEntries(Object.entries(source.reviewState).slice(0, 80))
    : {};
  return {
    learnerName: 'Trân',
    level: String(source.level || 'A0').slice(0, 20),
    lesson1Completed: Boolean(source.lesson1Completed),
    knownItems: Array.isArray(source.knownItems) ? source.knownItems.slice(0, 80).map(String) : [],
    reviewState
  };
}

function buildInstructions(context) {
  return `Tu es Luc, le professeur particulier de français de Trân. Trân est vietnamienne et débutante absolue A0.

RÈGLE DE LANGUE ACTUELLE : environ 95 % vietnamien et 5 % français. Ne parle jamais anglais. Toute explication, consigne, correction et encouragement doit être en vietnamien naturel et simple. Le français sert uniquement à introduire et pratiquer de petits éléments réellement enseignés.

PÉDAGOGIE : une seule chose à la fois ; 1 à 3 éléments français nouveaux maximum avant pratique ; priorité à l'oral réel ; phrases très courtes ; pas de test de niveau ; pas de longues explications grammaticales ; ne surcharge jamais. Fais parler Trân au lieu de réciter un cours. Corrige seulement ce qui est utile.

VOIX : tu es un professeur adulte, calme, chaleureux et patient. Parle naturellement, avec une présence posée et mature, sans ton enfantin ni enthousiasme artificiel. En vietnamien, débit normal et clair. Quand tu prononces un mot ou une phrase française à répéter, ralentis légèrement, articule proprement puis laisse un silence pour que Trân puisse répondre. N'exagère pas les syllabes.

PRONONCIATION : si l'audio de Trân est disponible, tu peux commenter uniquement ce que tu peux réellement entendre. N'invente jamais une analyse phonétique. Au début, vise surtout l'intelligibilité.

CONVERSATION : une question ou une consigne à la fois. Après ta réponse, laisse Trân parler. Si elle bloque, donne un petit indice en vietnamien avant la réponse.

CONTEXTE APPRENANTE : ${JSON.stringify(context)}

Au début d'une nouvelle session vocale, salue Trân brièvement en vietnamien et explique en une phrase que vous allez pratiquer tranquillement. Si elle n'a presque rien appris, commence avec Bonjour / Merci / Au revoir / Je m'appelle Trân. Ne suppose jamais qu'elle connaît autre chose.`;
}

function validToken(request) {
  const expected = process.env.TUTOR_ACCESS_TOKEN;
  if (!expected) return false;
  const received = request.headers.get('x-tutor-token') || '';
  if (received.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < received.length; i += 1) diff |= received.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export async function OPTIONS(request) {
  const cors = corsHeaders(request);
  return new Response(null, { status: cors.ok ? 204 : 403, headers: cors.headers });
}

export async function POST(request) {
  const cors = corsHeaders(request);
  if (!cors.ok) return json({ error: 'Origin not allowed.' }, 403, cors.headers);
  if (!process.env.OPENAI_API_KEY) return json({ error: 'OpenAI backend is not configured.' }, 503, cors.headers);
  if (!process.env.TUTOR_ACCESS_TOKEN) return json({ error: 'Tutor access protection is not configured.' }, 503, cors.headers);
  if (!validToken(request)) return json({ error: 'Unauthorized.' }, 401, cors.headers);

  try {
    const body = await request.json();
    const sdp = String(body?.sdp || '');
    if (!sdp.startsWith('v=0') || sdp.length > 200000) {
      return json({ error: 'Invalid SDP offer.' }, 400, cors.headers);
    }

    const context = compactLearnerContext(body?.learnerContext);
    const model = process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime';
    const voice = process.env.OPENAI_REALTIME_VOICE || 'cedar';
    const session = {
      type: 'realtime',
      model,
      output_modalities: ['audio'],
      max_output_tokens: 700,
      instructions: buildInstructions(context),
      audio: {
        input: {
          noise_reduction: { type: 'near_field' },
          transcription: {
            model: 'gpt-4o-mini-transcribe',
            prompt: 'Vietnamese learner practicing very basic French. Expect Vietnamese plus isolated beginner French words such as Bonjour, Merci, Au revoir and Je m’appelle Trân.'
          },
          turn_detection: {
            type: 'semantic_vad',
            eagerness: 'low',
            create_response: true,
            interrupt_response: true
          }
        },
        output: {
          voice,
          speed: 0.93
        }
      }
    };

    const form = new FormData();
    form.append('sdp', new Blob([sdp], { type: 'application/sdp' }), 'offer.sdp');
    form.append('session', new Blob([JSON.stringify(session)], { type: 'application/json' }), 'session.json');

    const upstream = await fetch('https://api.openai.com/v1/realtime/calls', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: form,
      signal: request.signal
    });

    const answer = await upstream.text();
    if (!upstream.ok) {
      console.error('OpenAI Realtime error', upstream.status, answer.slice(0, 2000));
      return json({ error: 'Realtime session creation failed.' }, upstream.status, cors.headers);
    }

    const headers = new Headers(cors.headers);
    headers.set('Content-Type', 'application/sdp');
    const location = upstream.headers.get('location');
    if (location) headers.set('X-OpenAI-Call-Location', location);
    return new Response(answer, { status: 201, headers });
  } catch (error) {
    if (error?.name === 'AbortError') return json({ error: 'Request cancelled.' }, 499, cors.headers);
    console.error('Realtime proxy error', error);
    return json({ error: 'Realtime backend error.' }, 500, cors.headers);
  }
}
