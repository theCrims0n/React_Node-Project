import { useEffect } from "react"
import Spinner from "../../../components/ui/spinner/Spinner"
import { useAuthStore } from "../../../store/auth/auth"
import { useUsersStore } from "../../../store/users/users"
import { Link } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"

const UsersList = () => {
    const { isLoading, isAuthentic } = useAuthStore()
    const { isLoading: isLoadingUsers, users, getUsers, deleteUser } = useUsersStore()

    useEffect(() => {
        getUsers()
    }, [])

    return (<>
        {
            isLoading || isLoadingUsers
                ?
                <Spinner />
                :
                <div>
                    <Link to={'/users/register'}><button className="m-8 button">Create new user</button></Link>
                    <div className="fade-in m-10 relative flex flex-col h-full overflow-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr className="font-bold">
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block  text-sm antialiased leading-none text-blue-gray-900 ">
                                            Name
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block  text-sm antialiased  leading-none text-blue-gray-900 ">
                                            Last Name
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block  text-sm antialiased  leading-none text-blue-gray-900 ">
                                            Email
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block  text-sm antialiased  leading-none text-blue-gray-900 ">
                                            Department
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block  text-sm antialiased  leading-none text-blue-gray-900 ">Actions</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block  text-sm antialiased  leading-normal text-blue-gray-900">
                                                        {user.name}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block  text-sm antialiased  leading-normal text-blue-gray-900">
                                                        {user.lastname}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block  text-sm antialiased  leading-normal text-blue-gray-900">
                                                        {user.email}
                                                    </p>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <p className="block  text-sm antialiased  leading-normal text-blue-gray-900">
                                                        {user.department}
                                                    </p>
                                                </td>
                                                <td className="py-4 flex space-x-8 ...">
                                                    <div>
                                                        <Link x-data="{ tooltip: 'Edit' }" to={`/users/edit/${user.id}`} className="cursor-pointer">
                                                            <Pencil color="#366a0c"/>
                                                        </Link>
                                                    </div>
                                                    <div >
                                                        <a x-data="{ tooltip: 'Delete' }" onClick={() => { deleteUser(user.id) }} className="cursor-pointer">
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
                </div >

        }
    </>)
}

export default UsersList