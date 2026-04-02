"use client";

import { useResumeStore } from "../../store/useResumeStore";

export default function EducationEditor() {
  const { data, updateField } = useResumeStore();

  const addEdu = () => {
    const newEdu = { 
      titre: "", 
      ecole: "", 
      date: "", 
      puces: [] // Initialisé vide pour que ce soit optionnel
    };
    updateField('formations', [...data.formations, newEdu]);
  };

  const updatePuce = (eduIdx: number, puceIdx: number, value: string) => {
    const next = [...data.formations];
    next[eduIdx].puces[puceIdx] = value;
    updateField('formations', next);
  };

  const addPuce = (eduIdx: number) => {
    const next = [...data.formations];
    next[eduIdx].puces.push("");
    updateField('formations', next);
  };

  const removePuce = (eduIdx: number, puceIdx: number) => {
    const next = [...data.formations];
    next[eduIdx].puces.splice(puceIdx, 1);
    updateField('formations', next);
  };

  return (
    <div className="space-y-6">
      {data.formations.map((edu: any, i: number) => (
        <div key={i} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700 space-y-3">
          
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Diplôme #{i + 1}</span>
            <button 
              onClick={() => {
                const next = [...data.formations];
                next.splice(i, 1);
                updateField('formations', next);
              }}
              className="text-[10px] text-red-500 uppercase font-bold hover:underline"
            >
              Supprimer
            </button>
          </div>

          {/* Ligne 1 : Diplôme / Formation */}
          <input 
            placeholder="Diplôme (ex: Master Data Science)"
            className="w-full bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-sm font-bold"
            value={edu.titre}
            onChange={(e) => {
              const next = [...data.formations];
              next[i].titre = e.target.value;
              updateField('formations', next);
            }}
          />

          {/* Ligne 2 : École | Lieu & Date (Style \hfill) */}
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Établissement | Ville"
              className="bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-xs"
              value={edu.ecole}
              onChange={(e) => {
                const next = [...data.formations];
                next[i].ecole = e.target.value;
                updateField('formations', next);
              }}
            />
            <input 
              placeholder="Date (ex: 2024 -- 2026)"
              className="bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-xs text-right italic"
              value={edu.date}
              onChange={(e) => {
                const next = [...data.formations];
                next[i].date = e.target.value;
                updateField('formations', next);
              }}
            />
          </div>

          {/* Section Puces Optionnelles */}
          <div className="mt-3 space-y-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase block">Détails optionnels (puces)</label>
            {edu.puces.map((puce: string, pIdx: number) => (
              <div key={pIdx} className="flex gap-2 items-center">
                <span className="text-blue-500 text-[10px]">•</span>
                <input 
                  placeholder="Ex: Architecture Big Data, IA..."
                  className="flex-1 bg-transparent border-b border-slate-800 py-1 outline-none text-[11px]"
                  value={puce}
                  onChange={(e) => updatePuce(i, pIdx, e.target.value)}
                />
                <button onClick={() => removePuce(i, pIdx)} className="text-slate-600 text-xs">×</button>
              </div>
            ))}
            <button 
              onClick={() => addPuce(i)}
              className="text-[10px] text-blue-400/70 hover:text-blue-400 font-bold"
            >
              + Ajouter un détail
            </button>
          </div>
        </div>
      ))}

      <button 
        onClick={addEdu} 
        className="w-full py-3 border-2 border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 transition-all text-xs font-bold rounded-xl uppercase tracking-widest"
      >
        + Ajouter un Diplôme
      </button>
    </div>
  );
}