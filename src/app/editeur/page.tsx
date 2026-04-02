"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from "../../store/useResumeStore";
import { 
  Menu, X, Download, ShieldCheck, CreditCard, Users
} from "lucide-react";
import Link from "next/link";

import InfoEditor from "../../components/cv-editor/InfoEditor";
import StyleEditor from "../../components/cv-editor/StyleEditor";
import ExperienceEditor from "../../components/cv-editor/ExperienceEditor";
import EducationEditor from "../../components/cv-editor/EducationEditor";
import ProjectCertEditor from "../../components/cv-editor/ProjectCertEditor";
import SkillsEditor from "../../components/cv-editor/SkillsEditor";
import SoftSkillsEditor from "../../components/cv-editor/softSkillsEditor";
import MainPreview from "../../components/cv-templates/MainPreview";

export default function Home() {
  const { data, setLanguage } = useResumeStore();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_${data.nom}_${data.prenom}`,
  });

  const processPaymentAndDownload = () => {
    setShowPayment(false);
    setTimeout(() => { handlePrint(); }, 500);
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/">
            <img src="/elanpro.png" alt="Logo" className="h-8 object-contain animate-dance cursor-pointer" />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all border border-white/10">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black border-b border-white/10 p-8 flex flex-col gap-6 text-2xl font-black uppercase z-[110] animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
            <Link href="/preinscription" onClick={() => setMenuOpen(false)}>Campus France</Link>
            <Link href="/contact" target="_blank" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/spontanee" target="_blank" onClick={() => setMenuOpen(false)}>candidature spontanée</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden shrink-0">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-30 scale-105">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
          <div className="animate-in fade-in zoom-in duration-1000">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight text-white">
              CRÉER VOTRE CV <br /> 
              <span className="text-blue-500 italic inline-block">avec elanpro</span>
            </h1>
            <p className="mt-4 text-slate-400 font-medium uppercase tracking-[0.3em] text-[10px] underline decoration-blue-500 underline-offset-8">
              Scrollez pour commencer l'édition
            </p>
          </div>
        </div>
      </section>

      {/* --- WRAPPER ÉDITEUR & PREVIEW --- */}
      <div className="flex flex-col lg:flex-row border-t border-white/10 bg-zinc-950">
        
        {/* COLONNE GAUCHE : ÉDITEUR (Alignée sur la hauteur A4) */}
        <div className="w-full lg:w-[380px] xl:w-[450px] flex flex-col border-r border-white/10 bg-black shrink-0 h-[1122px]">
          <div className="p-3 flex flex-col h-full"> 
            
            {/* Sélecteur de langue */}
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-white/5 w-fit mb-2 shrink-0">
              <button onClick={() => setLanguage('fr')} className={`px-2 py-0.5 text-[8px] font-black rounded transition ${data.langueCV === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>FR</button>
              <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 text-[8px] font-black rounded transition ${data.langueCV === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>EN</button>
            </div>

            {/* Zone scrollable des éditeurs */}
            <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-grow">
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><StyleEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><InfoEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><SkillsEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><ExperienceEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><EducationEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><ProjectCertEditor /></section>
              <section className="bg-white/[0.03] p-3 rounded-xl border border-white/5"><SoftSkillsEditor /></section>
            </div>
            
            {/* Bouton fixé en bas */}
            <div className="pt-4 pb-2 shrink-0">
              <button 
                onClick={() => setShowPayment(true)} 
                className="w-full py-4 bg-blue-600 text-white font-black rounded-lg uppercase tracking-widest text-[9px] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all border border-blue-400/20"
              >
                Générer PDF à 2 euros <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : PREVIEW */}
        <div className="flex-1 flex justify-center items-start p-4 lg:p-8 bg-zinc-950 h-[1122px] overflow-hidden">
          <div 
            ref={componentRef} 
            className="origin-top scale-[0.35] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] transition-transform duration-500 shadow-2xl print:scale-100 print:shadow-none print:m-0"
          >
            <MainPreview />
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-black border-t border-white/10 py-10 px-8 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <img src="/elanpro.png" alt="Logo" className="h-7 opacity-40 hover:opacity-100 transition-opacity mx-auto md:mx-0 mb-2" />
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-700 italic">
              © 2026 ELANPRO STUDIOS
            </p>
          </div>

          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500">
            <Link href="/about" className="hover:text-blue-500 transition-colors flex items-center gap-2">
              <Users size={12} /> Équipe
            </Link>
            <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
            <Link href="/spontanee" className="hover:text-blue-500 transition-colors">Services</Link>
          </div>
        </div>
      </footer>

      {/* --- MODALE --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] max-w-sm w-full space-y-6 text-center shadow-2xl">
            <h3 className="text-xl font-black uppercase italic text-blue-500">Paiement Sécurisé</h3>
            <div className="space-y-3">
              <button onClick={processPaymentAndDownload} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black uppercase text-[10px]">Payer et Télécharger (2€)</button>
              <button onClick={() => setShowPayment(false)} className="text-[9px] uppercase text-slate-500 hover:text-white transition-colors">Retour</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
        @keyframes dance { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-dance { animation: dance 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}