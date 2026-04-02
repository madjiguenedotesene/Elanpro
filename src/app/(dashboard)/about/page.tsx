"use client";
import { useEffect, useState } from "react";
import { Target, Award, Users, Menu, X, ExternalLink, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-600 min-h-screen overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/">
            <img src="/elanpro.png" alt="Logo" className="h-10 object-contain cursor-pointer" />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-black border-b border-white/10 p-8 flex flex-col gap-6 text-2xl font-black uppercase animate-in slide-in-from-top duration-300">
            <Link href="/editeur" onClick={() => setMenuOpen(false)}>Créateur CV</Link>
            <Link href="/spontanee" onClick={() => setMenuOpen(false)}>Candidatures</Link>
            <Link href="/preinscription" onClick={() => setMenuOpen(false)}>Campus France</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION AVEC VIDÉO ET TEXTE QUI DANSE --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* VIDÉO DE FOND */}
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-40">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        {/* AJOUT DE PT-24 POUR DESCENDRE LE TEXTE */}
        <header className="relative z-10 text-center space-y-6 max-w-3xl mx-auto px-6 pt-24">
          {/* ANIMATION DE DANSE (FLOAT + SKEW) SUR LE TITRE */}
          <div className="animate-dance">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              L'expertise derrière <br/> 
              <span className="text-blue-500 italic inline-block">votre succès</span>
            </h1>
          </div>
          <p className="text-slate-300 text-lg font-medium animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000">
            Deux visions complémentaires unies pour révolutionner votre accès aux opportunités internationales.
          </p>
        </header>
      </section>

      <div className="p-8 max-w-6xl mx-auto space-y-24 py-20">
        <section className="grid md:grid-cols-2 gap-12">
          
          {/* MA SENE (Lead Developer) */}
          <div className="group space-y-6 bg-white/[0.03] p-8 rounded-[3rem] border border-white/10 hover:border-blue-500/50 transition-all duration-500 animate-in fade-in slide-in-from-left-10 duration-1000 delay-500">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img src="/cv.png" alt="Ma Sene" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Ma Sene</h2>
                <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Co-fondatrice & Lead Developer</p>
              </div>
              <a href="https://linkedin.com/in/ma-sene/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-justify px-4">
              Ingénieure passionnée par l'architecture logicielle, Ma conçoit les outils technologiques qui simplifient la vie des candidats. Son expertise permet de transformer des procédures complexes en expériences numériques fluides et automatisées.
            </p>
          </div>

          {/* CHAMSEDINE SY (Expert RH) */}
          <div className="group space-y-6 bg-white/[0.03] p-8 rounded-[3rem] border border-white/10 hover:border-blue-500/50 transition-all duration-500 animate-in fade-in slide-in-from-right-10 duration-1000 delay-700">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img src="/Chams.png" alt="Chamsedine Sy" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Chamsedine Sy</h2>
                <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Co-fondateur & Expert RH</p>
              </div>
              <a href="https://linkedin.com/in/chamsedine-sy-536978289/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-justify px-4">
              Spécialiste du recrutement et du développement du potentiel humain, Chamsedine apporte son expertise fine des procédures Campus France. Son rôle est de bâtir des stratégies de candidature gagnantes pour maximiser les chances d'admission.
            </p>
          </div>

        </section>

        <section className="bg-blue-600 rounded-[3rem] p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-1000 duration-1000">
          <div className="relative z-10 grid md:grid-cols-3 gap-8 text-white">
            <div className="space-y-2"><Target /> <h3 className="font-black uppercase">Vision</h3> <p className="text-blue-100 text-sm">Démocratiser l'accès aux études internationales.</p></div>
            <div className="space-y-2"><Award /> <h3 className="font-black uppercase">Valeur</h3> <p className="text-blue-100 text-sm">Transparence et rigueur absolue dans chaque dossier.</p></div>
            <div className="space-y-2"><Users /> <h3 className="font-black uppercase">Impact</h3> <p className="text-blue-100 text-sm">Des centaines d'étudiants déjà propulsés.</p></div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </section>
      </div>

      <footer className="bg-black border-t border-white/10 py-20 px-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <img src="/elanpro.png" alt="Logo" className="h-10 opacity-50 mx-auto md:mx-0" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 italic">© 2026 ELANPRO STUDIOS</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-white transition-colors">Équipe</Link>
            <Link href="/spontanee" className="hover:text-white transition-colors">Services</Link>
          </div>
        </div>
      </footer>

      {/* ANIMATION DE DANSE CSS */}
      <style jsx global>{`
        @keyframes dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-5px) rotate(1deg); }
        }
        .animate-dance {
          animation: dance 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}