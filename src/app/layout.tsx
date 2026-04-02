import type { Metadata } from "next";
import "./globals.css";
import ChatAI from "@/components/ChatAI";

export const metadata: Metadata = {
  title: "ELANPRO STUDIOS | Architecte CV & Mobilité",
  description: "Générateur de CV anti-ATS professionnel, accompagnement Campus France et candidatures spontanées massives.",
  icons: {
    icon: "/elanpro.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-black scroll-smooth">
      {/* On déplace les styles du scrollbar dans globals.css ou on utilise des classes Tailwind */}
      <body className="bg-black text-white antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">
        
        <main className="flex-1">
          {children}
        </main>

        {/* L'IA flottante */}
        <ChatAI />

      </body>
    </html>
  );
}