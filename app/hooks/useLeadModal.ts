import { create } from 'zustand';

interface LeadModal {
  isOpen: boolean;
  data: any;
  currentUser: any,
  owner: any,
  notificationSelect: any,
  onOpen: () => void;
  onClose: () => void;
  setData: (item: any) => void;
  setCurrentUser: (item: any) => void
  setOwner: (item: any) => void,
}
const useLeadModal = create<LeadModal>((set) => ({
  isOpen: false,
  data: {},
  currentUser: {},
  owner: {},
  notificationSelect: {},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: {} }),
  setData: (item) => set(() => ({ data: item })),
  setCurrentUser: (item) => set({ currentUser: item}),
  setOwner: (item) => set({owner: item})
}));

export default useLeadModal;
