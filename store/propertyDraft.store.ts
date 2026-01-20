import { HouseListing } from '@/types/house';
import {create} from 'zustand';

type PropertyDraft = {
  draft:Partial<HouseListing>;
  setDraft: (data: Partial<HouseListing>) => void;
  resetDraft: () => void;
}


export const usePropertyDraftStore = create<PropertyDraft>((set) => ({
  draft: {},
  setDraft: (data) => set((state) => ({draft: {...state.draft, ...data}})),
  resetDraft: () => set(() => ({draft: {}}))
}));

