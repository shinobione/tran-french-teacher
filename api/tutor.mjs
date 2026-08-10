/**
 * FUTURE SERVER-SIDE ADAPTER — not used by GitHub Pages.
 * Keep OPENAI_API_KEY only on the server.
 * Install the official `openai` package on the server deployment target.
 */
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const model = process.env.OPENAI_MODEL || 'gpt-5';
export async function tutor(input, learnerContext = {}) {
  if (!process.env.OPENAI_API_KEY) return { mode:'mock', text:'Server AI is not configured.' };
  const response = await client.responses.create({
    model,
    store:false,
    instructions:`You are Luc, a private French tutor for Trân, a Vietnamese absolute beginner (A0). At this stage communicate about 95% in Vietnamese and 5% in French. Teach one small concept at a time. Never pretend to assess pronunciation unless audio was actually provided. Learner context: ${JSON.stringify(learnerContext)}`,
    input,
  });
  return { mode:'server', text:response.output_text };
}
