import { useState } from "react"
import Spinner from "../../../components/ui/spinner/Spinner"
import { Link } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import { Pagination } from "../../../components/ui/pagination/Pagination"
import { DialogModal } from "../../../components/ui/dialog/Dialog"
import { useModalStore } from "../../../store/ui/modal"
import { usePaginationStore } from "../../../store/pagination-store/pagination"

const UsersList = () => {

    const { openModalMenu } = useModalStore()
    const { data, isLoadingPagination } = usePaginationStore()
    const [idDelete, setIdDelete] = useState(0)

    return (
        <>
            {
                isLoadingPagination
                    ?
                    <Spinner />
                    :
                    <div>
                        <DialogModal value={idDelete} title="Delete user" content="Are you sure you want to delete this user? All of its data will be permanently removed.
                                                This action cannot be undone." />
                        <Link to={'/users/register'}><button className="m-8 button">Create new user</button></Link>
                        <div className="min-h-80 m-10 flex flex-col overflow-auto text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                            <table className="w-full text-left table-auto min-w-max ">
                                <thead className="font-medium">
                                    <tr>
                                        <th className="p-4 border-b border-blue-slate-100 bg-blue-slate-50">
                                            <p className="font-medium block leading-none text-blue-slate-900 ">
                                                Name
                                            </p>
                                        </th>
                                        <th className="p-4 border-b border-blue-slate-100 bg-blue-slate-50">
                                            <p className="block font-medium  leading-none text-blue-slate-900 ">
                                                Last Name
                                            </p>
                                        </th>
                                        <th className="p-4 border-b border-blue-slate-100 bg-blue-slate-50">
                                            <p className="block font-medium  leading-none text-blue-slate-900 ">
                                                Email
                                            </p>
                                        </th>
                                        <th className="p-4 border-b border-blue-slate-100 bg-blue-slate-50">
                                            <p className="block  font-medium leading-none text-blue-slate-900 ">
                                                Department
                                            </p>
                                        </th>
                                        <th className="p-4 border-b border-blue-slate-100 bg-blue-slate-50">
                                            <p className="block  font-medium leading-none text-blue-slate-900 ">Actions</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        data.map((user, index) => {
                                            return (
                                                <tr key={index} className="hover:bg-slate-100 font=normal text-sm">
                                                    <td className="p-4 border-b border-blue-slate-50">
                                                        <p className="block  text-slate-800 ">
                                                            {user.name}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 border-b border-blue-slate-50">
                                                        <p className="block  text-slate-800">
                                                            {user.lastname}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 border-b border-blue-slate-50">
                                                        <p className="block  text-slate-800">
                                                            {user.email}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 border-b border-blue-slate-50">
                                                        <p className="block text-slate-800">
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
                                                            <button type="button" onClick={() => [openModalMenu(), setIdDelete(user.id)]} className="cursor-pointer block">
                                                                <Trash2 color="#920c0c" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>


                        <div className="flex flex-wrap justify-center mt-1">
                            <Pagination url={'/api/users'} />
                        </div>
                    </ div>
            }
        </>
    )
}

export default UsersList