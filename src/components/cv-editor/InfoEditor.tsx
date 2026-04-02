"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function InfoEditor() {
  const { data, updateField } = useResumeStore();

  // AJOUT DE LA FONCTION ICI
  // Remplace ta fonction par celle-ci
  const formatFirstName = (val: string) => {
    if (!val) return "";
  // On nettoie les espaces et on force le format : Xxxxx
      const clean = val.trim();
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateField('photo', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateReseau = (index: number, val: string) => {
    const next = [...data.reseaux];
    next[index].url = val;
    updateField('reseaux', next);
  };

  const addReseau = () => {
    updateField('reseaux', [...data.reseaux, { nom: "", url: "" }]);
  };

  return (
    <div className="space-y-4 bg-slate-800/30 p-4 rounded-xl border border-slate-700">
      <div>
        <label className="text-[10px] text-blue-400 font-black uppercase block mb-2">Photo de profil</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
          className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white cursor-pointer" 
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input 
          placeholder="Prénom" 
          className="bg-slate-900 border border-slate-700 p-2 rounded text-sm outline-none focus:border-blue-500" 
          value={data.prenom} 
          onChange={(e) => updateField('prenom', formatFirstName(e.target.value))} 
        />
        <input 
          placeholder="Nom" 
          className="bg-slate-900 border border-slate-700 p-2 rounded text-sm outline-none focus:border-blue-500" 
          value={data.nom} 
          onChange={(e) => updateField('nom', e.target.value.toUpperCase())} 
        />
      </div>

      <input 
        placeholder="Titre (ex: DATA ENGINEER)" 
        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm font-bold text-blue-400 outline-none focus:border-blue-500" 
        value={data.titreJob} 
        onChange={(e) => updateField('titreJob', e.target.value)} 
      />

      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Âge" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.age} onChange={(e) => updateField('age', e.target.value)} />
        <input placeholder="Ville" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.ville} onChange={(e) => updateField('ville', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input placeholder="Téléphone" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.telephone} onChange={(e) => updateField('telephone', e.target.value)} />
        <input placeholder="Email" className="bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none" value={data.email} onChange={(e) => updateField('email', e.target.value)} />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] text-blue-400 font-black uppercase block">Liens</label>
        {data.reseaux.map((res, i) => (
          <input 
            key={i}
            placeholder="URL" 
            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs outline-none focus:border-blue-500" 
            value={res.url} 
            onChange={(e) => updateReseau(i, e.target.value)} 
          />
        ))}
        <button onClick={addReseau} className="text-[10px] text-slate-500 font-bold hover:text-blue-400 uppercase">+ Ajouter un lien</button>
      </div>

      <textarea placeholder="Profil Professionnel" className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-sm h-24 outline-none focus:border-blue-500" value={data.bio} onChange={(e) => updateField('bio', e.target.value)} />
    </div>
  );
}