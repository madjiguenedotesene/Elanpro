import { create } from 'zustand';

interface HardSkill { categorie: string; details: string; }
interface Experience { poste: string; entreprise: string; date: string; puces: string[]; }
interface Formation { titre: string; ecole: string; date: string; puces: string[]; }
interface Projet { titre: string; date: string; puces: string[]; }
interface Certification { titre: string; organisme: string; date: string; puces: string[]; }
interface Reseau { nom: string; url: string; }

interface ResumeSettings {
  fontFamily: string;
  bulletType: string;
  fontSize: number;
  sectionOrder: string[];
  lineStyle: 'solid' | 'dashed' | 'dotted' | 'double' | 'none' | 'thick' | 'gradient' | 'modern';
}

interface ResumeData {
  prenom: string; nom: string; titreJob: string; photo: string;
  email: string; telephone: string; ville: string; age: string;
  permis: string; bio: string; langueCV: 'fr' | 'en';
  colorPrimary: string; colorAccent: string;
  hardSkills: HardSkill[]; experiences: Experience[];
  formations: Formation[]; projets: Projet[];
  certifications: Certification[]; reseaux: Reseau[];
  langues: string[]; softSkills: string[]; interets: string[];
  settings: ResumeSettings;
}

interface ResumeState {
  data: ResumeData;
  updateField: (field: keyof ResumeData, value: any) => void;
  setLanguage: (lang: 'fr' | 'en') => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  data: {
    prenom: '', nom: '', titreJob: '', photo: '',
    email: '', telephone: '', ville: '', age: '', permis: '', bio: '',
    langueCV: 'fr', colorPrimary: '#1c366b', colorAccent: '#2980b9',
    hardSkills: [], experiences: [], formations: [], projets: [],
    certifications: [], reseaux: [], langues: [], softSkills: [], interets: [],
    settings: {
      fontFamily: 'serif',
      lineStyle: 'solid',
      bulletType: '•', 
      fontSize: 9,
      sectionOrder: ['profil', 'expertise', 'experiences', 'projets', 'formations', 'certifications', 'atouts']
    }
  },
  updateField: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),
  setLanguage: (lang) => set((state) => ({ data: { ...state.data, langueCV: lang } })),
}));