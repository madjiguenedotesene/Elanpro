"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function SkillsEditor() {
  const { data, updateField } = useResumeStore();

  const addSkill = () => updateField('hardSkills', [...data.hardSkills, { categorie: "", details: "" }]);

  return (
    <div className="space-y-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
      <label className="text-[10px] text-blue-400 font-black uppercase">Expertise Technique (LaTeX style)</label>
      {data.hardSkills.map((s, i) => (
        <div key={i} className="space-y-2 border-b border-slate-700 pb-2">
          <input placeholder="Catégorie (ex: Analyser)" className="w-full bg-transparent text-sm font-bold outline-none" value={s.categorie} onChange={(e) => {
            const next = [...data.hardSkills]; next[i].categorie = e.target.value; updateField('hardSkills', next);
          }} />
          <input placeholder="Détails (ex: SQL, Python)" className="w-full bg-transparent text-xs text-slate-400 outline-none" value={s.details} onChange={(e) => {
            const next = [...data.hardSkills]; next[i].details = e.target.value; updateField('hardSkills', next);
          }} />
        </div>
      ))}
      <button onClick={addSkill} className="w-full py-2 border border-dashed border-slate-600 text-[10px] text-slate-500 font-bold">+ AJOUTER EXPERTISE</button>
    </div>
  );
}