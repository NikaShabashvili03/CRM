import { create } from 'zustand';


interface EditProfileModal {
  isOpen: boolean;
  user: any,
  setUser: (item: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useEditProfileModal = create<EditProfileModal>((set) => ({
  isOpen: false,
  user: {},
  setUser: (item: any) => set({user: item}),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));



export default useEditProfileModal;