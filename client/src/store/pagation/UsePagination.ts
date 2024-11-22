import axios from "../../axios/axios";
import { Users } from "../../interface/users/users";

interface Pagination {
    page?: number;
    url?: string
}

const UsePagination = async ({
    page = 1,
    url = '',
}: Pagination) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    try {
        const result = await axios.get(url)
        const limit = 8;
        const offset = (page - 1) * limit;
        const resultPagination: any = await axios.post(url + '/pagination', { limit, offset })
        const totalPages = Math.ceil(result.data.result.length / limit);
        return {
            currentPage: page,
            totalPages: totalPages,
            data: resultPagination.data.result || []
        }

    } catch (error) {
        throw new Error("Error with pagination");
    }
}

export default UsePagination