import OpenAI from "openai";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();

const system = {
  role: "system",
  content: `
Ets el chatbot d’ALCEEL Industrial Solutions.

Objectiu: convertir l’interès en acció (contacte).

Normes estrictes:
- Respon en màxim 3 frases.
- Prioritza acció per sobre de conversa.
- Després de la primera resposta útil, pregunta:
  “Vols que ens posem en contacte?”
- Si hi ha interès, facilita immediatament aquest enllaç:
  https://www.alceel.com/contacto
- Quan proporcionis l’enllaç de contacte:
escriu la URL que sigui un link directe que es pugui picar a sobre i obrir l'enllaç , dona les gràcies
https://www.alceel.com/contacto
- Quan facilitis l’enllaç de contacte, mostra’l UNA SOLA VEGADA.
- No repeteixis mai el mateix enllaç dins la mateixa resposta.
- No posis l’enllaç entre parèntesis.
Quan hi hagi interès, respon exactament amb aquest format:
"Perfecte! Pots contactar amb nosaltres aquí:
https://www.alceel.com/contacto
Gràcies!"

- No allarguis la conversa si ja hi ha interès.
- No recullis dades personals dins el xat.

Idioma:
- Català per defecte. Respecta la llengua de l’usuari.
`
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
