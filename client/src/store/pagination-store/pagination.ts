import { create } from "zustand";

interface Pagination {
    getPagination: (page: number, url: string) => void;
}


export const usePaginationStore = create<Pagination>()((set) => ({

    getPagination: async (page, url) => {
        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;
        try {
            
        } catch (error) {
            throw new Error("Error with pagination");
        }

    },


}))