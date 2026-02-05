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

type PropertyMode = "create" | "edit";

type PropertyDraft = {
  mode?: PropertyMode;
  draft:MakeDraft<HouseListing>;
  editDraft:MakeDraft<HouseListing>;
  setDraft: (data: MakeDraft<HouseListing>) => void;
  setEditDraft: (data: MakeDraft<HouseListing>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  resetDraft: () => void;
  resetEditDraft: () => void;
}

const defaultDraft: MakeDraft<HouseListing> = {
  name: '',
  overview: '',
  meta: { status: 'inactive' },
  location: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
  },
  pricing: {
    monthly: 0,
    currency: '',
    deposit: 0,
  },
  media: {
    cover: { url: '', fileId: '' },
    gallery: [],
  },
  specs: {
    halls: 0,
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
    availableFrom: new Date(),
    leaseTerms: '',
    conditions: '',
  },
};



export const usePropertyDraftStore = create<PropertyDraft>()(persist((set) => ({
  mode: "create",
  draft: defaultDraft,
  editDraft: {},
  setEditDraft: (data) => set((state) => ({
    mode: "edit",
    editDraft: {
      ...state.editDraft,
      ...structuredClone(data),
    },
  })),
  resetEditDraft: () => set(() => ({mode: "create", editDraft: {}})),
  errors: {},
  setErrors: (errors) => set(() => ({errors})),
  clearErrors: () => set(() => ({errors: {}})),
  setDraft: (data) => set((state) => ({draft: {...state.draft, ...data}})),
  resetDraft: () => set(() => ({mode: "create", draft: defaultDraft}))
}), {
  name: "property-draft",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
        mode: state.mode,
        draft: state.draft,
        editDraft: state.editDraft,
      }),
})); 