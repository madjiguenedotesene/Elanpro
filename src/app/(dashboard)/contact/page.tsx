"use client";
import { useState, useEffect } from "react";
import { Mail, Phone, Send, Globe, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: ""
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-black" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ nom: "", email: "", objet: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSending(false);
      setTimeout(() => setFormStatus("idle"), 5000);
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
            <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>  
            <Link href="/editeur" target="_blank" onClick={() => setMenuOpen(false)}>Créateur CV</Link>
            <Link href="/spontanee" target="_blank" onClick={() => setMenuOpen(false)}>Candidatures</Link>
            <Link href="/preinscription" target="_blank" onClick={() => setMenuOpen(false)}>Campus France</Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-40">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <header className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6 pt-24">
          <div className="animate-dance">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Parlons de <br/> 
              <span className="text-blue-500 italic inline-block">votre projet</span>
            </h1>
          </div>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000">
            Une question ? Un besoin d'accompagnement ? Notre équipe vous répond sous 24h.
          </p>
        </header>
      </section>

      <div className="p-8 max-w-6xl mx-auto space-y-20 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* INFOS GAUCHE */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000 delay-500">
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Coordonnées</h2>
             <ContactBox icon={<Mail className="text-blue-500" />} title="Emails" desc1="andregomis3954@gmail.com" desc2="support@expert-cv.com" />
             <ContactBox icon={<Phone className="text-blue-500" />} title="Téléphones" desc1="+221 77 844 23 41" desc2="+33 6 00 00 00 00" />
             <ContactBox icon={<Globe className="text-blue-500" />} title="Bureaux" desc1="Dakar, Sénégal" desc2="Accompagnement International" />
          </div>

          {/* FORMULAIRE DROITE - CHAMPS VISIBLES */}
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-10 duration-1000 delay-700">
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Nom complet</label>
                  <input 
                    required 
                    value={formData.nom}
                    placeholder="Ex: Ma SENE"
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 outline-none transition-all shadow-inner" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Email professionnel</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="Ex: sene@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 outline-none transition-all shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Objet de la demande</label>
                <input 
                  required 
                  value={formData.objet}
                  placeholder="Ex: Demande de coaching Campus France"
                  onChange={(e) => setFormData({...formData, objet: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 outline-none transition-all shadow-inner" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Votre Message</label>
                <textarea 
                  required 
                  rows={5} 
                  value={formData.message}
                  placeholder="Décrivez votre projet ici..."
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 outline-none resize-none transition-all shadow-inner" 
                />
              </div>

              <button 
                disabled={isSending}
                className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all transform hover:-translate-y-1 shadow-2xl ${
                  formStatus === "success" ? "bg-green-600 shadow-green-500/20" : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/40"
                }`}
              >
                {isSending ? "Transmission..." : formStatus === "success" ? "Message Reçu ✅" : "Envoyer le message"}
              </button>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
            </form>
          </div>
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

function ContactBox({ icon, title, desc1, desc2 }: any) {
  return (
    <div className="flex gap-5 group">
      <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors shadow-inner text-white">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-sm font-bold text-white leading-tight">{desc1}</p>
        <p className="text-sm font-bold text-slate-400 leading-tight">{desc2}</p>
      </div>
    </div>
  );
}