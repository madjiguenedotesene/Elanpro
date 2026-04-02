"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from "../../store/useResumeStore";
import { 
  Menu, 
  X, 
  Download, 
  Laptop, 
  Layout, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sparkles,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import Link from "next/link";

// Imports des éditeurs
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fonction d'impression haute précision
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `CV_${data.nom}_${data.prenom}`,
  });

  // Fonction déclenchée après le clic sur un bouton de paiement
  const processPaymentAndDownload = () => {
    // Ici, on simule la réussite du paiement
    setShowPayment(false);
    setTimeout(() => {
      handlePrint();
    }, 500); // Petit délai pour laisser la modale se fermer proprement
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      
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
            <Link href="/spontanee" target="_blank">Candidatures</Link>
            <Link href="/preinscription" target="_blank">Campus France</Link>
            <Link href="/contact" target="_blank">Contact</Link>
          </div>
        )}
      </nav>

      {/* --- WRAPPER PRINCIPAL --- */}
      <div className="flex flex-col lg:flex-row flex-1 pt-16 overflow-hidden">
        
        {/* --- COLONNE GAUCHE : L'ÉDITEUR --- */}
        <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col border-r border-white/10 bg-black shadow-2xl no-print overflow-hidden">
          
          <header className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-white/5">
              <button onClick={() => setLanguage('fr')} className={`px-3 py-1 text-[9px] font-black rounded-md transition ${data.langueCV === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>FR</button>
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-[9px] font-black rounded-md transition ${data.langueCV === 'en' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>EN</button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-12 custom-scrollbar">
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Layout size={14}/> Design & Style
              </h2>
              <StyleEditor />
            </section>
          
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-blue-500/30"></span> 02. Informations Bio
              </h2>
              <InfoEditor />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Laptop size={14}/> Compétences Techniques
              </h2>
              <SkillsEditor />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Briefcase size={14}/> Expériences
              </h2>
              <ExperienceEditor />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <GraduationCap size={14}/> Formations
              </h2>
              <EducationEditor />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Award size={14}/> Projets & Certificats
              </h2>
              <ProjectCertEditor />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Sparkles size={14}/> Atouts & Soft Skills
              </h2>
              <SoftSkillsEditor />
            </section>

            <div className="pt-6 pb-12">
              <button 
                onClick={() => setShowPayment(true)}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3"
              >
                Télécharger le CV (2€) <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : PRÉVISUALISATION --- */}
        <div className="flex-1 bg-zinc-950 flex flex-col overflow-hidden">
          <div className="flex-1 flex justify-center items-start p-6 lg:p-12 overflow-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
            <div 
              ref={componentRef} 
              className="origin-top scale-[0.45] md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-500 shadow-[0_0_80px_rgba(0,0,0,0.8)] print:scale-100 print:shadow-none print:m-0"
            >
              <MainPreview />
            </div>
          </div>

          <footer className="h-14 bg-black border-t border-white/10 px-8 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-slate-600 shrink-0">
            <span>© 2026 ELANPRO STUDIOS</span>
            <div className="flex gap-6">
              <Link href="/contact" className="hover:text-white transition-colors">Aide</Link>
              <Link href="/about" className="hover:text-white transition-colors">Équipe</Link>
            </div>
          </footer>
        </div>
      </div>

      {/* --- MODALE DE PAIEMENT --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] max-w-md w-full space-y-8 shadow-2xl animate-in zoom-in duration-300 text-center">
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mb-4">
                    <ShieldCheck size={32} />
                </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Finaliser mon CV</h3>
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Version HD Anti-ATS • 2.00 €</p>
            </div>

            <div className="space-y-3 pt-4">
              <button 
                onClick={processPaymentAndDownload}
                className="w-full bg-[#ffc439] text-[#003087] font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:brightness-105 transition-all"
              >
                Payer avec PayPal
              </button>
              
              <button 
                onClick={processPaymentAndDownload}
                className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 transition-all border border-white/10"
              >
                <CreditCard size={14} /> Carte Bancaire
              </button>
            </div>

            <button 
              onClick={() => setShowPayment(false)}
              className="text-[9px] font-black uppercase text-slate-600 hover:text-white transition-colors tracking-widest pt-4"
            >
              Retour à l'édition
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-1.5deg); }
          75% { transform: translateY(-2px) rotate(1.5deg); }
        }
        .animate-dance {
          animation: dance 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
      `}</style>
    </div>
  );
}