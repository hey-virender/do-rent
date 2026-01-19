import {create} from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  landordDashboardItemIndex: number;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  toggleSidebar: () => void;
  leafletMapData : {
    lat: number | null;
    lng: number | null;
    address: string | null;
  imageUrl: string | null;
  };
  setLeafletMapData: (data: {lat: number; lng: number; address: string; imageUrl: string}) => void;
  setLandordDashboardItemIndex?: (index: number) => void;

  }
export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  landordDashboardItemIndex: 0,
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({isMenuOpen: !state.isMenuOpen})),
  toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen})),
  leafletMapData: {
    lat: null,
    lng: null,
    address: null, 
    imageUrl: null,
  },
  setLeafletMapData: (data) => set(() => ({leafletMapData: data})),
  setLandordDashboardItemIndex: (index) => set(() => ({landordDashboardItemIndex: index}))
}));  
