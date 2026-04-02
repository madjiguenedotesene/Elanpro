"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, Zap } from "lucide-react";

export default function ChatAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Salut ! Je suis ELAN-BOT. Une question sur Campus France ou ton CV ? 🚀" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "Erreur de connexion. 📡" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 transition-all border border-white/20 text-white"
      >
        {isOpen ? <X size={24} /> : <Zap size={24} className="fill-white" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] h-[500px] bg-black border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-5 bg-zinc-900 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 border border-blue-600/30 rounded-full flex items-center justify-center">
              <Zap size={20} className="text-blue-500 fill-blue-500" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tighter text-white leading-none">ELAN-BOT</p>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Expert Mobilité & ATS</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 bg-black/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                  m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-zinc-900 border border-white/10 text-slate-200 rounded-tl-none shadow-xl"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-white/10 p-3 rounded-2xl animate-pulse flex gap-1">
                  <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                  <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-950 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Écris ton message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
            />
            <button onClick={handleSend} className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors text-white shadow-lg">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}