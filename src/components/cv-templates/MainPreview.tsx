"use client";
import { useResumeStore } from "../../store/useResumeStore";
import { useRef, useEffect, useState } from "react";

export default function MainPreview() {
  const { data } = useResumeStore();
  const { settings, colorPrimary, colorAccent, langueCV } = data;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const A4_HEIGHT_PX = 1122; 

  useEffect(() => {
    const checkHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        setPercent(Math.round((height / A4_HEIGHT_PX) * 100));
      }
    };
    const observer = new ResizeObserver(checkHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data]);

  const t = {
    fr: {
      age: "Âge", years: "ans", tel: "Tel", email: "Email", ville: "Ville",
      profil: "Profil Professionnel", skills: "Compétences Techniques",
      exp: "Expériences Professionnelles", projets: "Réalisations & Projets",
      edu: "Diplômes et Formations", cert: "Certifications",
      atouts: "Atouts & Langues", langues: "Langues", soft: "Soft Skills",
      interests: "Centres d'Intérêt"
    },
    en: {
      age: "Age", years: "years", tel: "Phone", email: "Email", ville: "Location",
      profil: "Professional Summary", skills: "Technical Skills",
      exp: "Work Experience", projets: "Projects & Achievements",
      edu: "Education", cert: "Certifications",
      atouts: "Skills & Languages", langues: "Languages", soft: "Soft Skills",
      interests: "Interests"
    }
  }[langueCV || 'fr'];

  const baseSize = settings.fontSize || 9;
  const jobSize = baseSize + 13;
  const nameSize = baseSize + 6;
  const titleSize = baseSize + 1;
  const subSize = baseSize - 1;

  // --- LOGIQUE DES LIGNES ---
  const getLineStyle = () => {
    const styles: Record<string, any> = {
      double: { borderBottom: `3px double ${colorPrimary}`, height: '0px' },
      thick: { borderBottom: `2.5pt solid ${colorPrimary}`, height: '0px' },
      gradient: { height: '2px', background: `linear-gradient(to right, ${colorPrimary}, transparent)` },
      modern: { height: '3px', background: `linear-gradient(to right, ${colorAccent} 15%, ${colorPrimary} 15%)` },
      none: { height: '0px', display: 'none' }
    };
    return styles[settings.lineStyle] || { borderBottom: `1px ${settings.lineStyle} ${colorPrimary}`, height: '0px' };
  };

  // --- FONCTION DE RENDU DES LIGNES (Celle qui manquait) ---
  const renderSectionLine = () => {
    const style = getLineStyle();
    if (settings.lineStyle === 'none') return null;
    return (
      <div 
        style={{ 
          ...style, 
          width: '100%', 
          marginTop: '2px', 
          marginBottom: '6px',
          WebkitPrintColorAdjust: 'exact'
        }} 
      />
    );
  };

  return (
    <div className="relative">
      {/* Indicateur de dépassement (Hors impression) */}
      <div className="absolute -top-10 left-0 w-full flex items-center gap-3 no-print">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${percent > 100 ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
        <span className={`text-[10px] font-black ${percent > 100 ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
          {percent}% {percent > 100 ? 'DÉPASSEMENT' : ''}
        </span>
      </div>

      <div 
        ref={containerRef}
        className="bg-white p-[0.8cm] min-h-[29.7cm] w-[21cm] mx-auto text-slate-900 leading-tight relative shadow-2xl print:shadow-none" 
        style={{ fontFamily: settings.fontFamily, fontSize: `${baseSize}pt`, WebkitPrintColorAdjust: 'exact' }}
      >
        {/* Ligne de délimitation A4 */}
        <div className="absolute left-0 w-full border-b-2 border-dashed border-red-500/20 no-print pointer-events-none" style={{ top: '1122px' }}>
          <span className="bg-red-500 text-white text-[7px] px-2 py-0.5 rounded-full absolute right-0 -top-3">LIMITE PAGE 1</span>
        </div>

        <main className="space-y-4">
          {/* --- EN-TÊTE CORRIGÉ --- */}
        <div className="flex items-center gap-6 mb-4 w-full" style={{ minHeight: '3cm' }}>
          {data.photo && (
            <div className="flex-shrink-0" style={{ width: '2.8cm', height: '2.8cm' }}>
              <div className="rounded-full overflow-hidden border-2" style={{ borderColor: colorAccent, width: '2.8cm', height: '2.8cm' }}>
                <img src={data.photo} className="w-full h-full object-cover" alt="Profil" />
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="font-black uppercase tracking-tighter leading-none" style={{ color: colorAccent, fontSize: `${jobSize}pt` }}>
              {data.titreJob || "DATA ENGINEER"}
            </h1>
            <h2 className="font-bold mb-2" style={{ color: colorPrimary, fontSize: `${nameSize}pt` }}>
              {data.prenom} {data.nom?.toUpperCase()}
            </h2>
            
            {/* Infos de contact classiques */}
            <div className="flex flex-wrap gap-x-3 text-slate-700 font-medium" style={{ fontSize: `${subSize}pt` }}>
               {data.age && <span>{t.age} : {data.age} {t.years}</span>}
               {data.telephone && <span>{t.tel} : {data.telephone}</span>}
               {data.email && <span>{t.email} : {data.email}</span>}
               {data.ville && <span>{t.ville} : {data.ville}</span>}
            </div>

            {/* AJOUT : Affichage des liens / réseaux sociaux */}
            {data.reseaux && data.reseaux.length > 0 && (
              <div className="flex flex-wrap gap-x-3 font-bold text-blue-700 mt-1" style={{ fontSize: `${subSize}pt` }}>
                {data.reseaux.map((res, i) => (
                  <span key={i}>{res.url}</span>
                ))}
              </div>
            )}
          </div>
        </div>

          {data.bio && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.profil}</h3>
              {renderSectionLine()}
              <p className="text-justify whitespace-pre-line leading-relaxed">{data.bio}</p>
            </section>
          )}

          {data.hardSkills?.length > 0 && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.skills}</h3>
              {renderSectionLine()}
              <ul className="space-y-1 mt-1">
                {data.hardSkills.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: colorAccent }}>{settings.bulletType}</span>
                    <span><strong>{s.categorie} :</strong> {s.details}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.experiences?.length > 0 && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.exp}</h3>
              {renderSectionLine()}
              {data.experiences.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between font-bold">
                    <span style={{ color: colorPrimary }}>{exp.poste} | {exp.entreprise}</span>
                    <span className="italic" style={{ fontSize: `${subSize}pt` }}>{exp.date}</span>
                  </div>
                  <ul className="ml-4 mt-1 space-y-0.5">
                    {exp.puces.filter(p => p.trim() !== "").map((p, pi) => (
                      <li key={pi} className="flex gap-2"><span style={{ color: colorAccent }}>{settings.bulletType}</span>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {data.projets?.length > 0 && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.projets}</h3>
              {renderSectionLine()}
              {data.projets.map((proj, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between font-bold">
                    <span>{proj.titre}</span>
                    <span className="italic" style={{ fontSize: `${subSize}pt` }}>{proj.date}</span>
                  </div>
                  <ul className="ml-4 space-y-0.5">
                    {proj.puces.filter(p => p.trim() !== "").map((p, pi) => (
                      <li key={pi} className="flex gap-2"><span style={{ color: colorAccent }}>{settings.bulletType}</span>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {data.formations?.length > 0 && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.edu}</h3>
              {renderSectionLine()}
              {data.formations.map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between font-bold">
                    <span style={{ color: colorPrimary }}>{edu.titre} | {edu.ecole}</span>
                    <span className="italic" style={{ fontSize: `${subSize}pt` }}>{edu.date}</span>
                  </div>
                  <ul className="ml-4 space-y-0.5">
                    {edu.puces?.filter(p => p.trim() !== "").map((p, pi) => (
                      <li key={pi} className="flex gap-2"><span style={{ color: colorAccent }}>{settings.bulletType}</span>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section>
              <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.cert}</h3>
              {renderSectionLine()}
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-1">
                  <div className="font-bold">{cert.titre} {cert.organisme && `| ${cert.organisme}`}</div>
                  {cert.puces?.filter(p => p.trim() !== "").map((p, pi) => (
                    <div key={pi} className="ml-4 flex gap-2"><span style={{ color: colorAccent }}>{settings.bulletType}</span>{p}</div>
                  ))}
                </div>
              ))}
            </section>
          )}

          <section>
            <h3 className="font-bold uppercase" style={{ fontSize: `${titleSize}pt`, color: colorPrimary }}>{t.atouts}</h3>
            {renderSectionLine()}
            <div className="space-y-2 mt-2">
              {data.langues?.length > 0 && data.langues[0] !== "" && (
                <div className="flex flex-wrap items-center gap-2">
                  <strong>{t.langues} :</strong> 
                  {data.langues.map((l, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded border" style={{ borderColor: colorAccent, fontSize: `${subSize}pt`, WebkitPrintColorAdjust: 'exact' }}>{l}</span>
                  ))}
                </div>
              )}
              {data.softSkills?.length > 0 && data.softSkills[0] !== "" && (
                <div className="flex flex-wrap items-center gap-2">
                  <strong>{t.soft} :</strong> 
                  {data.softSkills.map((s, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded border" style={{ borderColor: colorAccent, fontSize: `${subSize}pt`, WebkitPrintColorAdjust: 'exact' }}>{s}</span>
                  ))}
                </div>
              )}
              {data.interets?.length > 0 && data.interets[0] !== "" && (
                <div className="flex flex-wrap items-center gap-2">
                  <strong>{t.interests} :</strong> 
                  {data.interets.map((item, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded border" style={{ borderColor: colorAccent, fontSize: `${subSize}pt`, WebkitPrintColorAdjust: 'exact' }}>{item}</span>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}