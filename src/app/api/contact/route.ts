import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, email, objet, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'andregomis3954@gmail.com',
        pass: 'elde udir vmrr qdsj', // Ton code d'application Google
      },
    });

    await transporter.sendMail({
      from: `"${nom}" <${email}>`,
      to: 'andregomis3954@gmail.com',
      subject: `NOUVEAU MESSAGE CONTACT : ${objet}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #3b82f6;">Nouveau message depuis le site</h2>
          <p><strong>De :</strong> ${nom} (${email})</p>
          <p><strong>Objet :</strong> ${objet}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}