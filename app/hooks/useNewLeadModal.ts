import { create } from 'zustand';

interface NotificationModal {
  isOpen: boolean;
  allUsers: any,
  currentUser: any,
  onOpen: () => void;
  onClose: () => void;
  setAllUsers: (item: any) => void
  setCurrentUser: (item: any) => void
}

const useNewLeadModal = create<NotificationModal>((set) => ({
  isOpen: false,
  allUsers: {},
  currentUser: {},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAllUsers: (item: any) => set({ allUsers: item}),
  setCurrentUser: (item: any) => set({ currentUser: item})
}));


export default useNewLeadModal;
