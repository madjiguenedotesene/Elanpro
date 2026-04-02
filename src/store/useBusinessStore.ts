import { create } from 'zustand';

interface BusinessState {
  // --- PARTIE CANDIDATURE SPONTANÉE ---
  spontanee: {
    packSelectionne: 'starter' | 'pro' | 'elite' | null;
    emailDedicace: string;
    passwordDedicace: string;
    identifiantFT: string;
    passwordFT: string;
    lettreMotivation: string;
    cvFileUrl: string | null;
    statut: 'en_attente' | 'paye' | 'en_cours' | 'termine';
  };

  // --- PARTIE PAIEMENT ---
  paiement: {
    preuveUpload: string | null; // Screenshot du reçu Wave/PayPal
    methodeUtilisee: 'wave' | 'paypal' | 'wero' | 'revolut' | null;
    montantDu: number; // 2€ pour CV ou 20/30/50€ pour pack
  };

  // --- ACTIONS ---
  updateSpontanee: (fields: Partial<BusinessState['spontanee']>) => void;
  updatePaiement: (fields: Partial<BusinessState['paiement']>) => void;
  resetBusiness: () => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  spontanee: {
    packSelectionne: null,
    emailDedicace: '',
    passwordDedicace: '',
    identifiantFT: '',
    passwordFT: '',
    lettreMotivation: '',
    cvFileUrl: null,
    statut: 'en_attente',
  },
  paiement: {
    preuveUpload: null,
    methodeUtilisee: null,
    montantDu: 0,
  },

  updateSpontanee: (fields) => 
    set((state) => ({ spontanee: { ...state.spontanee, ...fields } })),

  updatePaiement: (fields) => 
    set((state) => ({ paiement: { ...state.paiement, ...fields } })),

  resetBusiness: () => set({
    spontanee: { packSelectionne: null, emailDedicace: '', passwordDedicace: '', identifiantFT: '', passwordFT: '', lettreMotivation: '', cvFileUrl: null, statut: 'en_attente' },
    paiement: { preuveUpload: null, methodeUtilisee: null, montantDu: 0 }
  })
}));