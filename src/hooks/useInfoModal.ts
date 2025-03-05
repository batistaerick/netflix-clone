import { create, type StoreApi, type UseBoundStore } from 'zustand';

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModal: UseBoundStore<StoreApi<ModalStoreInterface>> =
  create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string): void => set({ isOpen: true, movieId }),
    closeModal: (): void => set({ isOpen: false, movieId: undefined }),
  }));

export default useInfoModal;
