"use client";
import { useResumeStore } from "@/store/useResumeStore";

export default function ProjectCertEditor() {
  const { data, updateField } = useResumeStore();

  // --- LOGIQUE PROJETS ---
  const addProject = () => updateField('projets', [...data.projets, { titre: "", date: "", puces: [""] }]);
  
  const updateProjectPuce = (pIdx: number, puceIdx: number, val: string) => {
    const next = [...data.projets];
    next[pIdx].puces[puceIdx] = val;
    updateField('projets', next);
  };

  const addProjectPuce = (pIdx: number) => {
    const next = [...data.projets];
    next[pIdx].puces.push("");
    updateField('projets', next);
  };

  // --- LOGIQUE CERTIFICATIONS ---
  const addCert = () => updateField('certifications', [...data.certifications, { titre: "", organisme: "", date: "", puces: [""] }]);

  const updateCertPuce = (cIdx: number, puceIdx: number, val: string) => {
    const next = [...data.certifications];
    next[cIdx].puces[puceIdx] = val;
    updateField('certifications', next);
  };

  const addCertPuce = (cIdx: number) => {
    const next = [...data.certifications];
    next[cIdx].puces.push("");
    updateField('certifications', next);
  };

  return (
    <div className="space-y-8">
      {/* SECTION PROJETS */}
      <div className="space-y-4">
        <label className="text-[11px] text-blue-400 font-black uppercase tracking-widest">Réalisations & Projets</label>
        {data.projets.map((proj: any, i: number) => (
          <div key={i} className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl space-y-3">
            <div className="flex gap-2">
               <input placeholder="Nom du projet" className="flex-1 bg-transparent border-b border-slate-700 outline-none text-sm font-bold" value={proj.titre} onChange={(e) => {
                 const next = [...data.projets]; next[i].titre = e.target.value; updateField('projets', next);
               }} />
               <input placeholder="Date" className="w-24 bg-transparent border-b border-slate-700 outline-none text-xs text-right" value={proj.date} onChange={(e) => {
                 const next = [...data.projets]; next[i].date = e.target.value; updateField('projets', next);
               }} />
            </div>
            <div className="space-y-2">
              {proj.puces.map((p: string, pi: number) => (
                <input key={pi} placeholder="Détail du projet..." className="w-full bg-transparent border-b border-slate-800 text-xs outline-none focus:border-slate-600" value={p} onChange={(e) => updateProjectPuce(i, pi, e.target.value)} />
              ))}
              <button onClick={() => addProjectPuce(i)} className="text-[10px] text-slate-500 font-bold">+ Ajouter détail</button>
            </div>
          </div>
        ))}
        <button onClick={addProject} className="w-full py-2 border border-dashed border-slate-700 text-xs font-bold text-blue-400 uppercase tracking-tighter hover:bg-slate-800/50 rounded-lg">+ Ajouter Projet</button>
      </div>

      {/* SECTION CERTIFICATIONS */}
      <div className="space-y-4">
        <label className="text-[11px] text-blue-400 font-black uppercase tracking-widest">Certifications</label>
        {data.certifications.map((cert: any, i: number) => (
          <div key={i} className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl space-y-3">
             <input placeholder="Certification (ex: AWS Solution Architect)" className="w-full bg-transparent border-b border-slate-700 outline-none text-sm font-bold" value={cert.titre} onChange={(e) => {
                 const next = [...data.certifications]; next[i].titre = e.target.value; updateField('certifications', next);
             }} />
             <div className="space-y-2">
                {cert.puces?.map((p: string, pi: number) => (
                  <input key={pi} placeholder="Détail ou score..." className="w-full bg-transparent border-b border-slate-800 text-xs outline-none" value={p} onChange={(e) => updateCertPuce(i, pi, e.target.value)} />
                ))}
                <button onClick={() => addCertPuce(i)} className="text-[10px] text-slate-500 font-bold">+ Ajouter détail</button>
             </div>
          </div>
        ))}
        <button onClick={addCert} className="w-full py-2 border border-dashed border-slate-700 text-xs font-bold text-blue-400 uppercase tracking-tighter hover:bg-slate-800/50 rounded-lg">+ Ajouter Certification</button>
      </div>
    </div>
  );
}