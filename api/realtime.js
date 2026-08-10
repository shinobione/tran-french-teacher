const DEFAULT_GITHUB_ORIGIN = 'https://shinobione.github.io';

function parseAllowedOrigins(req) {
  const values = new Set([DEFAULT_GITHUB_ORIGIN]);
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  if (host) values.add(`${proto}://${host}`);
  for (const value of String(process.env.ALLOWED_ORIGINS || '').split(',')) {
    const trimmed = value.trim();
    if (trimmed) values.add(trimmed.replace(/\/$/, ''));
  }
  return values;
}

function applyCors(req, res) {
  const origin = String(req.headers.origin || '').replace(/\/$/, '');
  const allowed = parseAllowedOrigins(req);
  if (origin && allowed.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return !origin || allowed.has(origin);
}

async function bodyAsJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function compactLearnerContext(value) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    learnerName: 'Trân',
    level: String(source.level || 'A0').slice(0, 20),
    lesson1Completed: Boolean(source.lesson1Completed),
    knownItems: Array.isArray(source.knownItems) ? source.knownItems.slice(0, 80).map(String) : [],
    reviewState: source.reviewState && typeof source.reviewState === 'object' ? source.reviewState : {},
  };
}

function buildInstructions(context) {
  return `Tu es Luc, le professeur particulier de français de Trân. Trân est vietnamienne et débutante absolue A0.\n\nRÈGLE DE LANGUE ACTUELLE : environ 95 % vietnamien et 5 % français. Ne parle jamais anglais. Toute explication, consigne, correction et encouragement doit être en vietnamien naturel et simple. Le français sert uniquement à introduire et pratiquer de petits éléments réellement enseignés.\n\nPÉDAGOGIE : une seule chose à la fois ; 1 à 3 éléments français nouveaux maximum avant pratique ; priorité à l'oral réel ; phrases très courtes ; pas de test de niveau ; pas de longues explications grammaticales ; ne surcharge jamais. Fais parler Trân au lieu de réciter un cours. Corrige seulement ce qui est utile.\n\nVOIX : tu es un professeur adulte, calme, chaleureux et patient. Parle naturellement, avec une présence posée et mature, sans ton enfantin ni enthousiasme artificiel. En vietnamien, débit normal et clair. Quand tu prononces un mot ou une phrase française à répéter, ralentis légèrement, articule proprement puis laisse un silence pour que Trân puisse répondre. N'exagère pas les syllabes.\n\nPRONONCIATION : si l'audio de Trân est disponible, tu peux commenter uniquement ce que tu peux réellement entendre. N'invente jamais une analyse phonétique. Au début, vise surtout l'intelligibilité.\n\nCONVERSATION : une question ou une consigne à la fois. Après ta réponse, laisse Trân parler. Si elle bloque, donne un petit indice en vietnamien avant la réponse.\n\nCONTEXTE APPRENANTE : ${JSON.stringify(context)}\n\nAu début d'une nouvelle session vocale, salue Trân brièvement en vietnamien et explique en une phrase que vous allez pratiquer tranquillement. Si elle n'a presque rien appris, commence avec Bonjour / Merci / Au revoir / Je m'appelle Trân. Ne suppose jamais qu'elle connaît autre chose.`;
}

module.exports = async function handler(req, res) {
  const corsOk = applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!corsOk) return res.status(403).json({ error: 'Origin not allowed.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Realtime backend is not configured.' });

  try {
    const body = await bodyAsJson(req);
    const sdp = String(body.sdp || '');
    if (!sdp.startsWith('v=0') || sdp.length > 200000) {
      return res.status(400).json({ error: 'Invalid SDP offer.' });
    }

    const context = compactLearnerContext(body.learnerContext);
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
    });

    const answer = await upstream.text();
    if (!upstream.ok) {
      console.error('OpenAI Realtime error', upstream.status, answer.slice(0, 2000));
      return res.status(upstream.status).json({ error: 'Realtime session creation failed.' });
    }

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/sdp');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(answer);
  } catch (error) {
    console.error('Realtime proxy error', error);
    return res.status(500).json({ error: 'Realtime backend error.' });
  }
};
