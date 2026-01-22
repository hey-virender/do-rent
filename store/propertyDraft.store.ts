import { HouseListing } from '@/types/house';
import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type MakeDraft<T> = {
  [K in keyof T]?:
    T[K] extends (infer U)[]
      ? MakeDraft<U>[]
      : T[K] extends object
      ? T[K] extends Date | File | Blob
        ? T[K]
        : MakeDraft<T[K]>
      : T[K];
};

type PropertyDraft = {
  draft:MakeDraft<HouseListing>;
  setDraft: (data: MakeDraft<HouseListing>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  resetDraft: () => void;
}


export const usePropertyDraftStore = create<PropertyDraft>()(persist((set) => ({
  draft: {
    name: '',
    overview: '',
    location: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      
    },
    pricing: {
      
      currency: '',
    
    },
    specs: {
      hall: 0,
      bedrooms: 0,
      bathrooms: 0,
      areaSqft: 0,
    },
    amenities: [],
    
    nearby: [],
    rules: {
      minimumStayMonths: undefined,
      petsAllowed: false,
      partiesAllowed: false,
      smokingAllowed: false,
    },
    availability: {
      availableFrom: '',
      leaseTerms: '',
      conditions: '',
    },

  },
  errors: {},
  setErrors: (errors) => set(() => ({errors})),
  clearErrors: () => set(() => ({errors: {}})),
  setDraft: (data) => set((state) => ({draft: {...state.draft, ...data}})),
  resetDraft: () => set(() => ({draft: {}}))
}), {
  name: "property-draft",
  storage: createJSONStorage(() => localStorage),
})); 