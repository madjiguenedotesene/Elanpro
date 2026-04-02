"use client";
import { useBusinessStore } from "@/store/useBusinessStore";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, CheckCircle, Laptop, ShieldCheck, Zap, FileText } from "lucide-react";
import Link from "next/link";

export default function SpontaneePage() {
  // RÉCUPÉRATION DU STORE COMPLET
  const { spontanee, updateSpontanee, paiement, updatePaiement } = useBusinessStore();
  
  const [showPayment, setShowPayment] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [letterFile, setLetterFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'letter' | 'proof') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'cv') {
      setCvFile(file);
      updateSpontanee({ cvFileUrl: file.name });
    } else if (type === 'letter') {
      setLetterFile(file);
      updateSpontanee({ lettreMotivation: file.name });
    } else if (type === 'proof') {
      setProofFile(file);
      // Correction : Mise à jour de la preuve dans le store Paiement
      updatePaiement({ preuveUpload: file.name });
    }
  };

  const handleFinalSubmit = async () => {
    // Vérification stricte avant envoi
    if (!proofFile || !paiement.methodeUtilisee) {
        return alert("Veuillez sélectionner un mode de paiement et joindre votre reçu.");
    }
    
    setIsSending(true);
    const formData = new FormData();
    
    // On tire les infos directement depuis ton store mis à jour
    formData.append("pack", spontanee.packSelectionne || "Starter");
    formData.append("emailDedicace", spontanee.emailDedicace);
    formData.append("passwordDedicace", spontanee.passwordDedicace);
    formData.append("identifiantFT", spontanee.identifiantFT);
    formData.append("passwordFT", spontanee.passwordFT);
    formData.append("methodePaiement", paiement.methodeUtilisee);

    if (cvFile) formData.append("cv", cvFile);
    if (letterFile) formData.append("letter", letterFile);
    if (proofFile) formData.append("proof", proofFile);

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Félicitations ! Votre dossier a été envoyé à André.");
        setShowPayment(false);
        // Reset optionnel ici
      } else {
        alert("Erreur lors de l'envoi du mail.");
      }
    } catch (error) {
      alert("Erreur réseau.");
    } finally {
      setIsSending(false);
    }
  };

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
            <Link href="/editeur" target="_blank">Créateur CV</Link>
            <Link href="/spontanee" onClick={() => setMenuOpen(false)}>Candidatures</Link>
            <Link href="/preinscription" target="_blank">Campus France</Link>
            <Link href="/contact" target="_blank">Contact</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-40">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <header className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6 pt-24 text-white">
          <div className="animate-dance">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={12} /> Flux Automatisé
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Candidatures <br/> 
              <span className="text-blue-500 italic inline-block">Spontanées</span>
            </h1>
          </div>
        </header>
      </section>

      <div className="p-8 max-w-6xl mx-auto space-y-20 py-20">
        
        {/* 1. GRILLE DES PACKS (Lien avec le Store) */}
        <div className="grid md:grid-cols-3 gap-6">
          <PackCard 
            title="Pack Starter" qty="500" price="20€" 
            active={spontanee.packSelectionne === 'starter'}
            onClick={() => updateSpontanee({ packSelectionne: 'starter' })}
          />
          <PackCard 
            title="Pack Pro" qty="1000" price="30€"
            active={spontanee.packSelectionne === 'pro'}
            onClick={() => updateSpontanee({ packSelectionne: 'pro' })}
          />
          <PackCard 
            title="Pack Elite" qty="2000" price="50€" 
            active={spontanee.packSelectionne === 'elite'}
            onClick={() => updateSpontanee({ packSelectionne: 'elite' })}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 2. DOCUMENTS (Lien avec les fichiers locaux + Store) */}
          <div className="space-y-6">
            <section className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tighter">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black italic">01</span> 
                Documents (PDF)
              </h2>
              <div className="space-y-6">
                <Uploader label="Curriculum Vitae" file={cvFile} onChange={(e) => handleFileUpload(e, 'cv')} />
                <Uploader label="Lettre de Motivation" file={letterFile} onChange={(e) => handleFileUpload(e, 'letter')} />
              </div>
            </section>
          </div>

          {/* 3. ACCÈS TECHNIQUES (Inputs liés au Store) */}
          <div className="space-y-8">
            <section className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-2xl">
              <h2 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tighter">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black italic">02</span> 
                Accès Techniques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Email Dédié" value={spontanee.emailDedicace} onChange={(v) => updateSpontanee({ emailDedicace: v })} placeholder="Email" />
                <InputField label="Pass Email" type="password" value={spontanee.passwordDedicace} onChange={(v) => updateSpontanee({ passwordDedicace: v })} placeholder="••••" />
                <InputField label="ID France Travail" value={spontanee.identifiantFT} onChange={(v) => updateSpontanee({ identifiantFT: v })} placeholder="ID" />
                <InputField label="Pass France Travail" type="password" value={spontanee.passwordFT} onChange={(v) => updateSpontanee({ passwordFT: v })} placeholder="••••" />
              </div>
            </section>

            <button 
              onClick={() => { 
                if(!cvFile || !letterFile || !spontanee.packSelectionne) return alert("Veuillez choisir un pack et joindre vos fichiers CV/Lettre !"); 
                setShowPayment(true); 
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl shadow-xl transition-all uppercase tracking-[0.2em] text-[10px]"
            >
              Suivant : Paiement & Validation
            </button>
          </div>
        </div>
      </div>

      {/* --- MODALE PAIEMENT (Lien avec le Store Paiement) --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[150] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] max-w-lg w-full space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-4 text-white">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Validation finale</h3>
              <button onClick={() => setShowPayment(false)}>✕</button>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Moyen de paiement</p>
              <div className="grid grid-cols-2 gap-3">
                {(['Wave', 'PayPal', 'Wero', 'Virement'] as const).map(m => (
                  <button 
                    key={m}
                    onClick={() => updatePaiement({ methodeUtilisee: m.toLowerCase() as any })}
                    className={`p-4 rounded-xl border-2 text-[10px] font-black uppercase transition-all ${paiement.methodeUtilisee === m.toLowerCase() ? 'border-blue-600 bg-blue-600/10 text-white' : 'border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Preuve de versement (Reçu)</p>
              <div className="p-6 bg-black border border-white/5 rounded-2xl">
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'proof')} className="text-[10px] w-full text-slate-400 file:bg-blue-600 file:border-0 file:rounded-lg file:text-white file:px-4 file:py-2 file:mr-4 file:font-black file:uppercase cursor-pointer" />
                {proofFile && <p className="mt-2 text-blue-500 text-[10px] font-bold italic">Fichier prêt : {proofFile.name}</p>}
              </div>
            </div>

            <button 
              disabled={!proofFile || !paiement.methodeUtilisee || isSending}
              onClick={handleFinalSubmit}
              className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em] disabled:opacity-50 transition-all active:scale-95"
            >
              {isSending ? "Transmission..." : "Envoyer mon dossier à André"}
            </button>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/10 py-24 px-8 mt-20 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4">
            <img src="/elanpro.png" alt="Logo" className="h-10 opacity-50" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 italic">© 2026 ELANPRO STUDIOS</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/contact">Contact</Link>
            <Link href="/about">Équipe</Link>
            <Link href="/spontanee">Services</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes dance { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-10px) rotate(-0.5deg); } 75% { transform: translateY(-5px) rotate(0.5deg); } }
        .animate-dance { animation: dance 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// Les composants Uploader, InputField et PackCard restent les mêmes, ils utilisent les props pour mettre à jour le store parent.
function Uploader({ label, file, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <div className="relative border-2 border-dashed border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/[0.02] transition-all cursor-pointer">
        <input type="file" accept=".pdf" onChange={onChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        <div className="flex flex-col items-center gap-2">
          <FileText className={file ? "text-blue-500" : "text-slate-600"} size={24} />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            {file ? `✅ ${file.name}` : `Glissez votre ${label} ici (PDF)`}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs text-white focus:border-blue-500 outline-none transition-all shadow-inner placeholder:text-slate-700" 
      />
    </div>
  );
}

function PackCard({ title, qty, price, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer p-10 rounded-[3rem] border-2 transition-all duration-500 ${active ? 'border-blue-600 bg-blue-600/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
    >
      <div className={`text-[10px] font-black uppercase mb-4 tracking-[0.2em] ${active ? 'text-blue-400' : 'text-slate-500'}`}>{title}</div>
      <div className="text-3xl font-black text-white leading-none">{qty} <span className="text-[10px] font-medium block mt-2 opacity-40">Envois massifs</span></div>
      <div className={`text-4xl font-black mt-8 tracking-tighter ${active ? 'text-blue-500' : 'text-white'}`}>{price}</div>
    </div>
  );
}