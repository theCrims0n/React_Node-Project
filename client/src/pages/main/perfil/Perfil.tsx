import { Pencil } from "lucide-react"
import Form from "../../../components/ui/form/Form"
import { Input } from "../../../components/ui/input/Input"
import { Label } from "../../../components/ui/label/Label"
import { Link } from "react-router-dom"

const Perfil = () => {

    return (

        <Form>
            <div className="w- full space-y-6 w-full flex flex-col gap-4">
                <div className="w-full flex flex-col align-center">
                    <Link to='/' className="justify-end flex"><Pencil>Login to your account</Pencil></Link>
                    <h5 className="text-xl font-medium text-gray-900">Your Perfil</h5>
                </div>
                <div>
                    <Label htmlFor="email" >Your full name</Label>
                    <p className="text-sm text-zinc-600 ">Miguel Angel Salomon Villegas</p>
                </div>
                <div>
                    <Label htmlFor="email" >Your email</Label>
                    <p className="text-sm text-zinc-600 ">mi.salomon89@gmail.com</p>
                </div>
            </div>
        </Form>

    )


}

export default Perfil