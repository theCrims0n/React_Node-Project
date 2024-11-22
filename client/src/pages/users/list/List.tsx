import { useEffect, useState } from "react"
import Spinner from "../../../components/ui/spinner/Spinner"
import { useUsersStore } from "../../../store/users/users"
import { Link, useLocation, useParams } from "react-router-dom"
import { Pencil, RefreshCcw, Trash2 } from "lucide-react"
import { Pagination } from "../../../components/ui/pagination/Pagination"
import UsePagination from "../../../store/pagation/UsePagination"
import { Tooltip } from 'react-tooltip'

import { Pencil, Trash2 } from "lucide-react"
import { Pagination } from "../../../components/ui/pagination/Pagination"
import UsePagination from "../../../store/pagation/UsePagination"

const UsersList = () => {

    const { page }: any = useParams()
    const { isLoading: isLoadingUsers, deleteUser } = useUsersStore()
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<any[]>([])
    const [idDelete, setIdDelete] = useState(0)

    useEffect(() => {

        getPagination(page)

    }, [page, isLoadingUsers])

    const getPagination = async (page: number) => {
        const url = '/api/users'
        const { totalPages, data } = await UsePagination({ page, url })
        setTotalPages(totalPages)
        setData(data)
        setIsLoading(false)
        setTimeout(() => {
            setIdDelete(0)
        }, 500);
    }
    const pathname = '/users/list'
    const { isLoading: isLoadingUsers, deleteUser } = useUsersStore()
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        setIsLoading(true)
        const getPagination = async (page: number) => {
            const url = '/api/users'
            const { totalPages, data } = await UsePagination({ page, url })
            setTotalPages(totalPages)
            setData(data)
        }
        getPagination(page)
        setIsLoading(false)
    }, [page, isLoadingUsers])

    return (<>
        {
            isLoading
                ?
                <Spinner />
                :
                <div >
                    <Link to={'/users/register'}><button className="m-8 button">Create new user</button></Link>
                    <div className="min-h-80 fade-in m-10 relative flex flex-col overflow-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                        <table className=" fade-in w-full text-left table-auto min-w-max">
                        <table className=" w-full text-left table-auto min-w-max">
                            <thead>
                                <tr className="font-bold">
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block antialiased leading-none text-blue-gray-900 ">
                                            Name
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block antialiased  leading-none text-blue-gray-900 ">
                                            Last Name
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block antialiased  leading-none text-blue-gray-900 ">
                                            Email
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block antialiased  leading-none text-blue-gray-900 ">
                                            Department
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block antialiased  leading-none text-blue-gray-900 ">Actions</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((user, index) => {
                                        return (
                                            <tr key={index} className={user.id == idDelete ? 'opacity-0 transition-all duration-500' : ''}>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block antialiased  leading-normal text-blue-gray-900">
                                                        {user.name}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block antialiased  leading-normal text-blue-gray-900">
                                                        {user.lastname}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block antialiased  leading-normal text-blue-gray-900">
                                                        {user.email}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block antialiased  leading-normal text-blue-gray-900">
                                                        {user.department}
                                                    </p>
                                                </td>
                                                <td className="py-4 flex space-x-8 ...">
                                                    <div>
                                                        <Link x-data="{ tooltip: 'Edit' }" to={`/users/edit/${user.id}`} className="cursor-pointer">
                                                            <Pencil color="#366a0c" />
                                                        </Link>
                                                    </div>
                                                    <div >
                                                        <a x-data="{ tooltip: 'Delete' }" onClick={() => [setIdDelete(user.id), deleteUser(user.id)]} className="cursor-pointer">
                                                            <Trash2 color="#920c0c" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center pr-4">
                        <div className="pt-10 mr-4">
                            <button id='tooltip-default' onClick={() => getPagination(page)}>
                                <RefreshCcw />
                            </button>
                            <Tooltip
                                anchorSelect="#tooltip-default"
                                content="Refresh"
                            />
                        </div>
                        <div>
                            {totalPages > 0 && (<Pagination totalPages={totalPages} />)}
                        </div>
                    </div>
                    <Pagination totalPages={totalPages} pathname={pathname} />
                </div >
        }
    </>)
}

export default UsersList