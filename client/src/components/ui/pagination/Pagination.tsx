'use client';

import clsx from 'clsx';
import { generatePaginationNumbers } from '../../../utils/generatePaginationNumbers';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowBigLeft, ArrowBigRight, MoveLeft, MoveRight } from 'lucide-react';


interface Props {
    totalPages: number;
    pathname: string;
}


export const Pagination = ({ totalPages, pathname }: Props) => {

    const { page } = useParams();
    const navigate = useNavigate()


    const pageString = page ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        navigate(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {

        const params = pageNumber;

        if (pageNumber === '...') {
            return `${pathname}?${params}`
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
        <div className="flex text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                        <Link to={createPageUrl(currentPage - 1)} className="button">Previous</Link>
                    </li>
                    {
                        allPages.map((page, index) => (
                            <li>
                                <Link to={createPageUrl(page)} className={clsx(
                                    "button",
                                    {
                                        'buttonPagination': page === currentPage
                                    }
                                )}>{page}</Link>
                            </li>

                        ))

                    }
                    <li>
                        <Link to={createPageUrl(currentPage + 1)} className="button">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
