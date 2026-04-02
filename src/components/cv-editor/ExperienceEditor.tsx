"use client";

import { useResumeStore } from "../../store/useResumeStore";

export default function ExperienceEditor() {
  const { data, updateField } = useResumeStore();

  // Ajouter une nouvelle expérience vide
  const addExp = () => {
    const newExp = { 
      poste: "", 
      entreprise: "", // Ici l'utilisateur mettra "Entreprise à Lieu"
      date: "", 
      puces: [""] // Commence avec une puce vide
    };
    updateField('experiences', [...data.experiences, newExp]);
  };

  // Supprimer une expérience
  const removeExp = (index: number) => {
    const next = [...data.experiences];
    next.splice(index, 1);
    updateField('experiences', next);
  };

  // Gérer les puces (itemize) pour une expérience spécifique
  const addPuce = (expIndex: number) => {
    const next = [...data.experiences];
    next[expIndex].puces.push("");
    updateField('experiences', next);
  };

  const updatePuce = (expIndex: number, puceIndex: number, value: string) => {
    const next = [...data.experiences];
    next[expIndex].puces[puceIndex] = value;
    updateField('experiences', next);
  };

  const removePuce = (expIndex: number, puceIndex: number) => {
    const next = [...data.experiences];
    next[expIndex].puces.splice(puceIndex, 1);
    updateField('experiences', next);
  };

  return (
    <div className="space-y-6">
      {data.experiences.map((exp: any, i: number) => (
        <div key={i} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700 space-y-3 relative group">
          
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Expérience #{i + 1}</span>
            <button 
              onClick={() => removeExp(i)}
              className="text-[10px] text-red-500 hover:text-red-400 uppercase font-bold transition"
            >
              Supprimer l'expérience
            </button>
          </div>

          {/* Ligne 1 : Poste */}
          <input 
            placeholder="Poste (ex: Data Scientist)"
            className="w-full bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-sm font-bold"
            value={exp.poste}
            onChange={(e) => {
              const next = [...data.experiences];
              next[i].poste = e.target.value;
              updateField('experiences', next);
            }}
          />

          {/* Ligne 2 : Entreprise + Lieu & Date */}
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="Entreprise à Lieu"
              className="bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-xs"
              value={exp.entreprise}
              onChange={(e) => {
                const next = [...data.experiences];
                next[i].entreprise = e.target.value;
                updateField('experiences', next);
              }}
            />
            <input 
              placeholder="Date (ex: 2024 -- 2026)"
              className="bg-transparent border-b border-slate-700 py-1 focus:border-blue-500 outline-none text-xs text-right"
              value={exp.date}
              onChange={(e) => {
                const next = [...data.experiences];
                next[i].date = e.target.value;
                updateField('experiences', next);
              }}
            />
          </div>

          {/* Section Puces (itemize) */}
          <div className="space-y-2 mt-4">
            <label className="text-[9px] font-bold text-slate-500 uppercase">Missions & Réalisations (puces)</label>
            {exp.puces.map((puce: string, puceIdx: number) => (
              <div key={puceIdx} className="flex gap-2 items-center">
                <span className="text-blue-500 text-xs">●</span>
                <input 
                  placeholder="Décrire une mission..."
                  className="flex-1 bg-transparent border-b border-slate-800 py-1 focus:border-slate-600 outline-none text-[11px]"
                  value={puce}
                  onChange={(e) => updatePuce(i, puceIdx, e.target.value)}
                />
                {exp.puces.length > 1 && (
                  <button 
                    onClick={() => removePuce(i, puceIdx)}
                    className="text-slate-600 hover:text-red-500 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button 
              onClick={() => addPuce(i)}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-bold mt-2"
            >
              + Ajouter une puce
            </button>
          </div>

        </div>
      ))}

      <button 
        onClick={addExp} 
        className="w-full py-3 border-2 border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 transition-all text-xs font-bold rounded-xl uppercase tracking-widest"
      >
        + Ajouter une Expérience
      </button>
    </div>
  );
}