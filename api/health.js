export function GET() {
  return Response.json({
    ok: true,
    service: 'tran-french-teacher-realtime',
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    accessProtected: Boolean(process.env.TUTOR_ACCESS_TOKEN),
    realtimeModel: process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime',
    realtimeVoice: process.env.OPENAI_REALTIME_VOICE || 'cedar',
    region: process.env.VERCEL_REGION || null,
    version: '1.1.1',
    build: 6
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
