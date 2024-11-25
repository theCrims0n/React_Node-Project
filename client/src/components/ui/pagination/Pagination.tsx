import clsx from 'clsx';
import { generatePaginationNumbers } from '../../../utils/generatePaginationNumbers';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { usePaginationStore } from '../../../store/pagination-store/pagination';
import { RefreshButton } from '../refresh/RefreshButton';
import { useUsersStore } from '../../../store/users/users';

interface Props {
    url: string;
}

export const Pagination = ({ url }: Props) => {

    const { page } = useParams();
    const navigate = useNavigate()
    const { getPagination, totalPages, data } = usePaginationStore()
    const { isLoading } = useUsersStore()
    const location = useLocation().pathname.toString().split('/')
    const pathname = '/' + location[1] + '/' + location[2]

    const pageString = page ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    useEffect(() => {
        getPagination(Number(page), url)
        if (currentPage > totalPages || currentPage < 1 || isNaN(+pageString)) {
            navigate(`${pathname}/${allPages.length.toString()}`);
        }
        if (currentPage < 1 || isNaN(+pageString)) {
            navigate(pathname);
        }
    }, [currentPage, isLoading])

    const createPageUrl = (pageNumber: number | string) => {

        const params = pageNumber;

        if (pageNumber === '...') {
            return `${pathname}/${page}`
        }

        if (+pageNumber <= 0) {
            return `${pathname}/1`;
        }

        if (totalPages <= 0) {
            return `${pathname}/1`;
        }

        if (+pageNumber > totalPages) {
            return `${pathname}/${page}`;
        }
        return `${pathname}/${params}`;
    }

    return (
        <div className="fade-in flex text-center justify-center">
            <div className="flex text-center justify-center">
                <div className='mr-4'>
                    <RefreshButton onClick={() => getPagination(Number(page), url)} />
                </div>
                <nav aria-label="Page navigation example">

                    <ul className="inline-flex -space-x-px text-base h-10">
                        <li>
                            <Link to={createPageUrl(currentPage - 1)} className="button">Previous</Link>
                        </li>
                        {
                            allPages.map((page, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={createPageUrl(page)} className={clsx(
                                            "button",
                                            {
                                                'buttonPagination': page === currentPage
                                            }
                                        )}>{page}</Link>
                                    </li>
                                )
                            })
                        }
                        <li>
                            <Link to={createPageUrl(currentPage + 1)} className="button">Next</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
