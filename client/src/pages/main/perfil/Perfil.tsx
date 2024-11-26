import { Pencil } from "lucide-react"
import Form from "../../../components/ui/form/Form"
import { Input } from "../../../components/ui/input/Input"
import { Label } from "../../../components/ui/label/Label"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth"
import Spinner from "../../../components/ui/spinner/Spinner"
import { Tooltip } from "react-tooltip"

const Perfil = () => {

    const { user, isLoading }: any = useAuthStore()

    return (
        <>
            {
                isLoading
                    ?
                    <Spinner />
                    :
                    <Form>
                        <div className="w- full space-y-6 w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col align-center">
                                <Link to={`/users/edit/${user?.id}`} className="justify-end flex"><Pencil id='profile' className="focus:outline-none"/></Link>
                                <Tooltip 
                                anchorSelect="#profile" place="bottom" 
                                content="Update your profile data"
                                />
                                <h5 className="text-xl font-medium text-gray-900">My Profile</h5>
                            </div>
                            <div>
                                <Label htmlFor="email" >Your full name</Label>
                                <p className="text-sm text-zinc-600 ">{user?.name + ' ' + user?.lastname}</p>
                            </div>
                            <div>
                                <Label htmlFor="email" >Your email</Label>
                                <p className="text-sm text-zinc-600 ">{user?.email}</p>
                            </div>
                        </div>
                    </Form>
            }
        </>
    )


}

export default Perfil