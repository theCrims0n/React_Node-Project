import { create } from 'zustand';

interface State {
    isModalOpen: boolean;
    openModalMenu: () => void;
    closeModalMenu: () => void;
}

export const useModalStore = create<State>()((set) => ({
    isModalOpen: false,

    openModalMenu: () => set({ isModalOpen: true }),
    closeModalMenu: () => set({ isModalOpen: false }),
}));