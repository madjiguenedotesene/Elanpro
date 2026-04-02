"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowUpRight, GraduationCap, ShieldCheck, Zap, Menu, X } from "lucide-react";
import Link from "next/link";

export default function PreinscriptionPage() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const EXTERNAL_SITE_URL = "https://ton-autre-site-de-preinscription.com";

  return (
    <div className="bg-black text-white font-sans selection:bg-blue-600 min-h-screen overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/">
            <img src="/elanpro.png" alt="Logo" className="h-10 object-contain cursor-pointer" />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all border border-white/10">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-20 left-0 w-full bg-black border-b border-white/10 p-8 flex flex-col gap-6 text-2xl font-black uppercase animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
            <Link href="/editeur" target="_blank" onClick={() => setMenuOpen(false)}>Créateur CV</Link>
            <Link href="/spontanee" target="_blank" onClick={() => setMenuOpen(false)}>Candidatures</Link>
            <Link href="/contact" target="_blank" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION AVEC VIDÉO ET TEXTE QUI DANSE --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-40">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <header className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6 pt-24">
          <div className="animate-dance">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={12} /> Service Premium
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Accompagnement <br/> 
              <span className="text-blue-500 italic inline-block">Études en France</span>
            </h1>
          </div>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000">
            Ne laissez pas le hasard décider de votre avenir. Profitez d'une expertise complète pour réussir votre procédure Campus France.
          </p>
        </header>
      </section>

      <div className="p-8 max-w-6xl mx-auto space-y-24 py-20">
        
        {/* --- ARGUMENTS CLÉS --- */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<GraduationCap className="text-blue-500" />}
            title="Choix Stratégique"
            desc="Sélection des universités et formations avec le plus fort taux d'acceptation selon votre profil."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-blue-500" />}
            title="Dossier Blindé"
            desc="Optimisation de vos paniers de formations et correction de vos motivations par des experts."
          />
          <FeatureCard 
            icon={<ArrowUpRight className="text-blue-500" />}
            title="Suivi Garanti"
            desc="Assistance jusqu'à l'obtention de votre préinscription et préparation à l'entretien."
          />
        </div>

        {/* --- SECTION PACKS --- */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Nos Formules d'Accompagnement</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pack Standard */}
            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-6 hover:border-blue-500/50 transition-all group">
              <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors">Pack Assistance</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-slate-400 font-medium"><CheckCircle2 size={18} className="text-blue-500 shrink-0" /> Création et paramétrage du compte</li>
                <li className="flex gap-3 text-sm text-slate-400 font-medium"><CheckCircle2 size={18} className="text-blue-500 shrink-0" /> Aide au remplissage du dossier physique</li>
                <li className="flex gap-3 text-sm text-slate-400 font-medium"><CheckCircle2 size={18} className="text-blue-500 shrink-0" /> Vérification des justificatifs</li>
              </ul>
              <div className="text-3xl font-black pt-6 border-t border-white/5">Sur Devis</div>
            </div>

            {/* Pack Full Expertise */}
            <div className="bg-blue-600 p-10 rounded-[3rem] space-y-6 shadow-2xl shadow-blue-500/20 transform md:-translate-y-6 transition-transform hover:scale-[1.02]">
              <div className="bg-white text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase w-fit tracking-widest">Le plus complet</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Pack Full Success</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-blue-100 font-medium"><CheckCircle2 size={18} className="text-white shrink-0" /> Tout le Pack Assistance</li>
                <li className="flex gap-3 text-sm text-blue-100 font-medium"><CheckCircle2 size={18} className="text-white shrink-0" /> Rédaction personnalisée des motivations</li>
                <li className="flex gap-3 text-sm text-blue-100 font-medium"><CheckCircle2 size={18} className="text-white shrink-0" /> Coaching entretien (simulation réelle)</li>
                <li className="flex gap-3 text-sm text-blue-100 font-medium"><CheckCircle2 size={18} className="text-white shrink-0" /> Stratégie de recours si besoin</li>
              </ul>
              <div className="text-3xl font-black pt-6 border-t border-white/20 text-white">Sur Devis</div>
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <div className="bg-white/[0.03] border border-blue-500/30 p-12 md:p-20 rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-500">Prêt à lancer <br/><span className="text-blue-500">votre projet ?</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Rejoignez notre plateforme de gestion des préinscriptions pour démarrer votre dossier aujourd'hui avec nos experts.
            </p>
            <a 
              href={EXTERNAL_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-white text-black font-black px-12 py-6 rounded-2xl mt-8 uppercase tracking-[0.2em] text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-xl transform hover:-translate-y-1"
            >
              Accéder à la préinscription <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/10 py-24 px-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <img src="/elanpro.png" alt="Logo" className="h-10 opacity-50 hover:opacity-100 transition-opacity mx-auto md:mx-0" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 italic">© 2026 ELANPRO STUDIOS - ALL RIGHTS RESERVED</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/about" className="hover:text-white transition-colors">Équipe</Link>
            <Link href="/spontanee" className="hover:text-white transition-colors">Services</Link>
          </div>
        </div>
      </footer>

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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] space-y-6 hover:border-blue-500/50 transition-all group hover:-translate-y-2">
      <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase tracking-tighter text-white">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}