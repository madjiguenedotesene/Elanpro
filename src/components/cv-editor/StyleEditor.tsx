"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function StyleEditor() {
  const { data, updateField } = useResumeStore();

  // Mise à jour simplifiée des réglages (settings)
  const updateSettings = (newSettings: Partial<typeof data.settings>) => {
    updateField('settings', { ...data.settings, ...newSettings });
  };

  return (
    <div className="space-y-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      
      {/* --- SECTION 1 : TYPOGRAPHIE --- */}
      <div className="space-y-4">
        {/* Choix de la Police */}
        <div>
          <label className="text-[10px] font-black text-blue-400 uppercase block mb-2 tracking-widest">
            Style de Police
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.fontFamily}
            onChange={(e) => updateSettings({ fontFamily: e.target.value })}
          >
            <option value="serif">Classique</option>
            <option value="sans-serif">Moderne</option>
            <option value="monospace">Technique</option>
            <option value="'Inter', sans-serif">Professionnel</option>
          </select>
        </div>

        {/* Taille du Texte */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Taille du texte ({data.settings.fontSize}pt)
            </label>
          </div>
          <input 
            type="range" 
            min="7" 
            max="12" 
            step="0.5"
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            value={data.settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
          />
          <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-bold">
            <span>DENSE (7pt)</span>
            <span>AÉRÉ (12pt)</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* --- SECTION 2 : COULEURS --- */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Couleur \section</label>
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded border border-slate-700">
            <input 
              type="color" 
              value={data.colorPrimary} 
              onChange={(e) => updateField('colorPrimary', e.target.value)} 
              className="w-8 h-8 rounded bg-transparent cursor-pointer" 
            />
            <span className="text-[10px] text-slate-300 font-mono uppercase">{data.colorPrimary}</span>
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Couleur Accents</label>
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded border border-slate-700">
            <input 
              type="color" 
              value={data.colorAccent} 
              onChange={(e) => updateField('colorAccent', e.target.value)} 
              className="w-8 h-8 rounded bg-transparent cursor-pointer" 
            />
            <span className="text-[10px] text-slate-300 font-mono uppercase">{data.colorAccent}</span>
          </div>
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* --- SECTION 3 : ÉLÉMENTS GRAPHIQUES --- */}
      <div className="space-y-4">
        {/* Style de Puce */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 tracking-widest">
            Style de Puce
          </label>
          <select 
  className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
  value={data.settings.bulletType}
  onChange={(e) => updateSettings({ bulletType: e.target.value })}
>
  <optgroup label="Classiques">
    <option value="•">• Point standard</option>
    <option value="–">– Tiret simple</option>
    <option value="—">— Tiret long </option>
  </optgroup>

  <optgroup label="Géométrique">
    <option value="■">■ Carré plein</option>
    <option value="□">□ Carré vide</option>
    <option value="○">○ Cercle vide</option>
    <option value="◈">◈ Losange pointé</option>
    <option value="◆">◆ Losange plein</option>
  </optgroup>

  <optgroup label="Flèches & Tech">
    <option value="➤">➤ Flèche pleine</option>
    <option value="→">→ Flèche fine</option>
    <option value="»">» Guillemet double</option>
    <option value="▹">▹ Triangle vide</option>
    <option value="✔">✔ Checkmark </option>
  </optgroup>

  <optgroup label="Minimaliste">
    <option value="|">| Barre verticale</option>
    <option value="∗">∗ Astérisque</option>
    <option value="·">· Point médian</option>
  </optgroup>
</select>
        </div>

        {/* Design de la ligne de section */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 tracking-widest">
            Design des Bordures 
          </label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white outline-none focus:border-blue-500"
            value={data.settings.lineStyle}
            onChange={(e) => updateSettings({ lineStyle: e.target.value as any })}
          >
            <option value="solid">Ligne continue</option>
            <option value="double">Double ligne</option>
            <option value="thick">Ligne épaisse</option>
            <option value="gradient">Dégradé</option>
            <option value="modern">Moderne</option>
            <option value="dashed">Tirets</option>
            <option value="dotted">Points</option>
            <option value="none">Aucune</option>
          </select>
        </div>
      </div>

    </div>
  );
}