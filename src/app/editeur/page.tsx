"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResumeStore } from "../../store/useResumeStore";
import { Menu, X, Download, Laptop, Layout, Briefcase, GraduationCap, Award, Sparkles, ShieldCheck, CreditCard } from "lucide-react";
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
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/"><img src="/elanpro.png" alt="Logo" className="h-8 object-contain animate-dance" /></Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-xl border border-white/10">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 pt-16 overflow-hidden">
        <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col border-r border-white/10 bg-black no-print overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-12 custom-scrollbar">
            <section><StyleEditor /></section>
            <section><InfoEditor /></section>
            <section><SkillsEditor /></section>
            <section><ExperienceEditor /></section>
            <section><EducationEditor /></section>
            <section><ProjectCertEditor /></section>
            <section><SoftSkillsEditor /></section>
            <div className="pt-6 pb-12">
              <button onClick={() => setShowPayment(true)} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                Télécharger le CV (2€) <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-zinc-950 flex flex-col overflow-hidden">
          <div className="flex-1 flex justify-center items-start p-6 lg:p-12 overflow-auto bg-black">
            <div ref={componentRef} className="origin-top scale-[0.45] md:scale-[0.6] lg:scale-[0.75] xl:scale-[0.85] transition-transform duration-500 shadow-2xl print:scale-100 print:m-0">
              <MainPreview />
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] max-w-md w-full space-y-8 text-center">
            <h3 className="text-2xl font-black uppercase">Finaliser mon CV</h3>
            <button onClick={processPaymentAndDownload} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px]">Payer et Télécharger</button>
            <button onClick={() => setShowPayment(false)} className="text-[9px] uppercase text-slate-500">Annuler</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes dance { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-dance { animation: dance 4s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
      `}</style>
    </div>
  );
}