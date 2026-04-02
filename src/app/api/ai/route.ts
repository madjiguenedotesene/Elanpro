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
        // CHANGEMENT ICI : On utilise un modèle plus intelligent
        model: "mistral-small-latest", 
        messages: [
          { 
            role: "system", 
            content: "Tu es ELAN-BOT, l'assistant officiel d'ELANPRO STUDIOS. Tu es un expert en CV ATS, lettres de motivation et procédures Campus France. Ta mission : aider les étudiants avec professionnalisme. Réponds en français pur, évite l'abus de caractères gras (**), ne donne pas de code informatique, et sois chaleureux mais concis." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7 // Ajoute ceci pour que l'IA soit moins "robotique"
      })
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      // On nettoie un peu la réponse au cas où il reste des espaces bizarres
      const cleanAnswer = data.choices[0].message.content.trim();
      return NextResponse.json({ answer: cleanAnswer });
    }

    return NextResponse.json({ answer: "Désolé, je rencontre une petite zone de turbulences. Réessaie !" });

  } catch (error) {
    return NextResponse.json({ answer: "Erreur de connexion ELANPRO. 📡" });
  }
}