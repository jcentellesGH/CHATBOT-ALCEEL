import OpenAI from "openai";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const system = {
      role: "system",
      content:
        "Ets l’assistent d’ALCEEL (consultoria industrial i transformació digital). Respon en català, clar i orientat a acció. " +
        "Fes preguntes curtes per entendre el cas i proposa següents passos. Si demanen preus, demana context abans."
    };

    const resp = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [system, ...(messages || [])]
    });

    return Response.json({ reply: resp.output_text || "" });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
