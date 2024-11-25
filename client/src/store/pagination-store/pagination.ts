import { create } from "zustand";
import axios from "../../axios/axios";

interface Pagination {
    data: any[];
    currentPage: number;
    totalPages: number;
    isLoadingPagination: boolean;
    getPagination: (page: number, url: string) => void;
}

export const usePaginationStore = create<Pagination>()((set) => ({
    data: [],
    currentPage: 0,
    totalPages: 0,
    isLoadingPagination: true,
    getPagination: async (page, url) => {

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;
        try {
            //set({ isLoadingPagination: true })
            const result = await axios.get(url)
            const limit = 8;
            const offset = (page - 1) * limit;
            const resultPagination: any = await axios.post(url + '/pagination', { limit, offset })
            const totalPages = Math.ceil(result.data.result.length / limit);
            set({ isLoadingPagination: false, currentPage: page, totalPages: totalPages, data: resultPagination.data.result || [] })
        } catch (error) {
            set({ isLoadingPagination: false })
        }
    }
}))