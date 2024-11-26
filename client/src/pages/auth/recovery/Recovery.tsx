import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth"
import SpinnerButton from "../../../components/ui/spinner/Spinner-Button"
import { useEffect } from "react"
import { Input } from '../../../components/ui/input/Input'
import { Label } from "../../../components/ui/label/Label"
import validateEmail from "../../../helper/validator"
import { PasswordInput } from "../../../components/ui/password/PasswordInput"
import { Mail } from "lucide-react"

const Recovery = () => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm()

    const { recover, isLoading, clear, errorMessage } = useAuthStore()

    const navigate = useNavigate()
    const onSubmit = async (data: any) => {
        try {
            const { email, password } = data
            const isValidEmail = validateEmail(email)
            if (!isValidEmail) {
                setError('email', { type: 'pattern', message: 'Email with invalid format' })
                return
            }
            if (password.length < 5) {
                setError('password', { type: 'minLength', message: 'Password must have at least 5 letters' })
                return
            }
            const result: any = await recover(email, password)
            if (result.status != 200) {
                return
            }
            navigate('/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        clear()
    }, [])

    return (

        <div >

            <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-slate-800 text-center text-2xl font-medium">Recover your password</h2>
                <form onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <div className="h-full">
                        <Label className=" text-sm mb-2 block">Email</Label>
                        <div className="relative flex items-center">
                            <Input {...register('email', { required: true })} type="email" placeholder="Enter email"
                                className={!errors.email ? 'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30' : ''}
                            />
                            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Mail size={16} strokeWidth={2} color="#585656" aria-hidden="true" />
                            </div>

                        </div>
                        <div className="relative flex items-center">
                            <span hidden={!errors.email} className="m-1 text-xs text-red-500">{'Email field is required'}</span>
                            <span hidden={!errorMessage} className="m-1 text-xs text-red-500">{errorMessage}</span>
                        </div>
                    </div>
                    <div className="h-full">
                        <Label className=" text-sm mb-2 block">Password</Label>
                        <PasswordInput {...register('password', { required: true })} />
                        <div className="relative flex items-center">
                            <span hidden={!errors.email} className="m-1 text-xs text-red-500">{'Password field is required'}</span>
                        </div>
                    </div>
                    <div >
                        <div className="flex items-stretch">
                            <div >
                                <Link to={'/auth/login'}><button className="buttonCancel">Cancel</button></Link>
                            </div>
                            <div className="pl-2 w-full">
                                <button disabled={isLoading} type="submit" className="w-full button">
                                    {isLoading ? <SpinnerButton /> : 'Send new password'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Recovery