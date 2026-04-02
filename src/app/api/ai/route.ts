import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.MISTRAL_API_KEY?.trim();

    if (!apiKey) return NextResponse.json({ answer: "Clé Mistral manquante ! 🔑" });

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistral-tiny", // Le plus rapide et gratuit au début
        messages: [
          { role: "system", content: "Tu es ELAN-BOT d'ELANPRO STUDIOS. Expert CV ATS et Campus France. Réponds court." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return NextResponse.json({ answer: data.choices[0].message.content });
    }

    return NextResponse.json({ answer: "Mistral réfléchit trop... Réessaie !" });

  } catch (error) {
    return NextResponse.json({ answer: "Erreur de connexion ELANPRO. 📡" });
  }
}