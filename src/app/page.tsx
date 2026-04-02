"use client";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Laptop, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/">
            <img src="/elanpro.png" alt="Logo" className="h-10 object-contain hover:scale-105 transition-transform" />
          </Link>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl transition-all border border-white/10 flex items-center gap-2 group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Menu</span>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* --- MENU BURGER OVERLAY (TEXTES RÉDUITS) --- */}
        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-black border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300 z-[110]">
            <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4 text-2xl md:text-4xl font-black uppercase tracking-tighter">
                <Link href="/editeur" target="_blank" className="hover:text-blue-500 flex justify-between items-center group transition-colors">
                  Créateur CV <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link href="/spontanee" target="_blank" className="hover:text-blue-500 flex justify-between items-center group transition-colors">
                  Candidatures <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link href="/preinscription" target="_blank" className="hover:text-blue-500 flex justify-between items-center group transition-colors">
                  Campus France <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                </Link>
                <Link href="/contact" target="_blank" className="hover:text-blue-500 flex justify-between items-center group transition-colors">
                  Contact <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
              <div className="border-l border-white/10 pl-10 hidden md:block">
                <p className="text-slate-500 uppercase text-[9px] font-black tracking-widest mb-4">À propos</p>
                <Link href="/about" target="_blank" className="text-xl font-bold hover:text-blue-500 block mb-3 italic transition-colors">Notre Équipe</Link>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">Expertise logicielle et RH pour votre réussite internationale.</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (TITRE AFFINÉ) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-50 scale-105">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
          <div className="animate-bounce-slow">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight text-white">
              Get the job <br /> 
              <span className="text-blue-500 italic inline-block hover:skew-x-3 transition-transform cursor-default">
                with elanpro
              </span>
            </h1>
          </div>

          <p className="text-slate-300 text-sm md:text-lg font-medium max-w-md mx-auto leading-relaxed opacity-80">
            L'expertise Elanpro pour votre carrière et votre mobilité internationale.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Link href="/editeur" target="_blank" className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
              Éditeur de CV <ArrowUpRight size={12} />
            </Link>
            <Link href="/spontanee" target="_blank" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white/20 transition-all">
              Nos Packs Envois
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTIONS DYNAMIQUES AVEC LIENS --- */}
      <section className="py-40 px-6 max-w-7xl mx-auto space-y-60">
        
        {/* 1. LOGICIEL -> Lien Candidatures */}
        <div className="grid md:grid-cols-2 gap-20 items-center group">
          <div className="space-y-8">
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-12 transition-transform"><Laptop /></div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-500">Logiciel de <br/> <span className="font-black">Ciblage</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">Envoyez vos candidatures là où elles sont attendues grâce à notre algorithme intelligent.</p>
            <Link href="/spontanee" target="_blank" className="inline-flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs border-b-2 border-blue-500 pb-1 hover:gap-4 transition-all">Lancer une campagne <ArrowUpRight size={14} /></Link>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/logiciel.jpeg" alt="Logiciel" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>

        {/* 2. CAMPUS FRANCE -> Lien Preinscription */}
        <div className="grid md:grid-cols-2 gap-20 items-center group">
          <div className="relative order-2 md:order-1 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/campus.jpeg" alt="Campus France" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-12 transition-transform"><GraduationCap /></div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-500">Procédure <br/> <span className="font-black">Campus France</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">Transformez votre rêve d'études en projet concret avec notre accompagnement expert.</p>
            <Link href="/preinscription" target="_blank" className="inline-flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs border-b-2 border-blue-500 pb-1 hover:gap-4 transition-all">Savoir plus <ArrowUpRight size={14} /></Link>
          </div>
        </div>

        {/* 3. CONSEIL -> Lien Contact */}
        <div className="grid md:grid-cols-2 gap-20 items-center group">
          <div className="space-y-8">
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-12 transition-transform"><Sparkles /></div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-500">Optimisation <br/> <span className="font-black">Expertise</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">Un coaching personnalisé pour préparer vos entretiens et booster votre profil.</p>
            <Link href="/contact" target="_blank" className="inline-flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs border-b-2 border-blue-500 pb-1 hover:gap-4 transition-all">Prendre rendez-vous <ArrowUpRight size={14} /></Link>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/conseille.jpeg" alt="Conseil" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>

        {/* 4. CV EXPERT -> Lien Editeur */}
        <div className="grid md:grid-cols-2 gap-20 items-center group">
          <div className="relative order-2 md:order-1 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
            <img src="/cve.png" alt="CV" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:rotate-12 transition-transform"><Briefcase /></div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors duration-500">Curriculum <br/> <span className="font-black">Haute Performance</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">Des modèles optimisés pour les ATS qui captiveront les recruteurs immédiatement.</p>
            <Link href="/editeur" target="_blank" className="inline-flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs border-b-2 border-blue-500 pb-1 hover:gap-4 transition-all">Utiliser l'éditeur <ArrowUpRight size={14} /></Link>
          </div>
        </div>

      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/10 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <img src="/elanpro.png" alt="Logo" className="h-16 mx-auto brightness-125 hover:rotate-6 transition-transform" />
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Prêt pour <span className="text-blue-500 italic underline decoration-4 underline-offset-8">l'élan ?</span>
          </h3>
          <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/contact" className="hover:text-white transition-colors">Email</Link>
            <Link href="/about" className="hover:text-white transition-colors">Équipe</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
          <p className="text-[10px] text-slate-800 font-bold tracking-[0.5em] pt-20 uppercase">© 2026 ELANPRO STUDIOS - ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}