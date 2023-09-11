import { create } from 'zustand';

interface EditModal {
  isOpen: boolean;
  currentUser: any,
  data: any,
  setData: (item: any) => void,
  onOpen: () => void;
  onClose: () => void;
  setCurrentUser: (item: any) => void
}

const useEditModal = create<EditModal>((set) => ({
  isOpen: false,
  currentUser: {},
  data: {},
  setData: (item: any) => set({data: item}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCurrentUser: (item: any) => set({ currentUser: item})
}));


export default useEditModal;