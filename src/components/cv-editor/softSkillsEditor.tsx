"use client";
import { useState, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function SoftSkillsEditor() {
  const { data, updateField } = useResumeStore();

  // États locaux pour permettre de taper des virgules et espaces sans bug
  const [langTxt, setLangTxt] = useState(data.langues.join(", "));
  const [softTxt, setSoftTxt] = useState(data.softSkills.join(", "));
  const [intTxt, setIntTxt] = useState(data.interets.join(", "));

  // Synchronisation : Quand on tape, on met à jour le store
  const handleChange = (field: "langues" | "softSkills" | "interets", value: string) => {
    if (field === "langues") setLangTxt(value);
    if (field === "softSkills") setSoftTxt(value);
    if (field === "interets") setIntTxt(value);

    const array = value.split(",").map((item) => item.trim());
    updateField(field, array);
  };

  return (
    <div className="space-y-6 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-2 block">Langues</label>
        <input 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none"
          value={langTxt}
          onChange={(e) => handleChange("langues", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-2 block">Soft Skills</label>
        <textarea 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none min-h-[80px]"
          value={softTxt}
          onChange={(e) => handleChange("softSkills", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase mb-2 block">Centres d'intérêt</label>
        <input 
          className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-sm text-white outline-none"
          value={intTxt}
          onChange={(e) => handleChange("interets", e.target.value)}
        />
      </div>
    </div>
  );
}