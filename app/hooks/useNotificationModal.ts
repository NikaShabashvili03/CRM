import { create } from 'zustand';

interface NotificationModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNotificationModal = create<NotificationModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useNotificationModal;
