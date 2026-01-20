import {create} from 'zustand';

interface UIStore {
  dashboardActiveItem: string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  leafletMapData : {
    lat: number | null;
    lng: number | null;
    address: string | null;
  imageUrl: string | null;
  };
  setLeafletMapData: (data: {lat: number; lng: number; address: string; imageUrl: string}) => void;
  setDashboardActiveItem?: (item: string) => void;

  }
export const useUIStore = create<UIStore>((set) => ({
  
  dashboardActiveItem: "Overview",
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({isMenuOpen: !state.isMenuOpen})),

  leafletMapData: {
    lat: null,
    lng: null,
    address: null, 
    imageUrl: null,
  },
  setLeafletMapData: (data) => set(() => ({leafletMapData: data})),
  setDashboardActiveItem: (item) => set(() => ({dashboardActiveItem: item}))
}));  
