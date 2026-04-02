export interface Experience {
  poste: string;
  entreprise: string;
  date: string;
  puces: string[];
}

export interface Formation {
  titre: string;
  ecole: string;
  date: string;
  puces: string[];
}

export interface ResumeData {
  prenom: string;
  nom: string;
  titreJob: string;
  email: string;
  telephone: string;
  ville: string;
  age: string;
  bio: string;
  colorPrimary: string;
  colorAccent: string;
  experiences: Experience[];
  formations: Formation[];
  langues: string[];
  softSkills: string[];
  reseaux: { nom: string; url: string }[];
}