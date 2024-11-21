import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth";
import { useEffect, useMemo, useState } from "react";
import SpinnerButton from "../../../components/ui/spinner/Spinner-Button";
import validateEmail from "../../../helper/validator";
import { Input } from '../../../components/ui/input/Input'
import { Label } from "../../../components/ui/label/Label";
import { PasswordInput } from "../../../components/ui/password/PasswordInput";
import { Mail } from "lucide-react";

const Register = () => {

    const { register, handleSubmit, setError, formState: { isLoading, isSubmitting, isSubmitSuccessful, errors } } = useForm<any>();

    const { signup, errorMessage, clear } = useAuthStore()

    const navigate = useNavigate()

    const onSubmit = async (data: any) => {
        try {
            //clear()
            const { password, confirmPassword, email } = data

            const isValidEmail = validateEmail(email)
            if (!isValidEmail) {
                setError('email', { type: 'pattern', message: 'Email with invalid format' })
                return
            }

            if (password != confirmPassword) {
                setError('confirmPassword', { type: 'custom', message: 'The two passwords do not match' })
                return
            }

            if (password.length < 8) {
                setError('password', { type: 'minLength', message: 'Password must have at least 8 letters' })
                return
            }
            const result: any = await signup(data)
            if (result.status != 200) {
                return
            }
            navigate('/users/list')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        clear()
    }, [])

    return (

        <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold mb-8">Welcome, Please register here! :D</h2>
            <form onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                <div className="flex w-full justify-center items-center space-x-4">
                    <div className="flex items-start flex-col justify-start w-full">
                        <Label htmlFor="name" className="text-gray-800 text-sm mb-2 block">Name</Label>
                        <Input {...register('name', { required: 'Name is required' })} className={`${errors.name ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} placeholder="Enter Name" type="text" id="name" />
                        <span className="m-1 text-xs text-red-500" hidden={!errors.name}>{`${errors?.name?.message}`}</span>
                    </div>
                    <div className="flex items-start flex-col justify-start w-full">
                        <Label htmlFor="lastname" className="text-gray-800 text-sm mb-2 block">Last Name</Label>
                        <Input {...register('lastname', { required: 'Last Name is required' })} className={`${errors.lastname ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} placeholder="Enter Last Name" type="text" id="lastname" />
                        <span className="m-1 text-xs text-red-500" hidden={!errors.lastname}>{`${errors?.lastname?.message}`}</span>
                    </div>
                </div>
                <div className="h-full">
                    <Label className=" text-sm mb-2 block">Email</Label>
                    <div className="relative flex items-center">
                        <Input {...register('email', { required: 'Email field is required' })} type="text" placeholder="Enter email"
                            className={`${errors.email ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <Mail size={16} strokeWidth={2} color="#585656" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="relative flex items-center">
                        <span className="m-1 text-xs text-red-500" hidden={!errorMessage}>{errorMessage}</span>
                        <span className="m-1 text-xs text-red-500" hidden={!errors.email}>{`${errors?.email?.message}`}</span>                                </div>
                </div>
                <div className="flex items-start flex-col justify-start">
                    <Label htmlFor="password" className=" text-sm mb-2 block">Password</Label>
                    <PasswordInput {...register('password', { required: 'Password field is required' })} className={`${errors.password ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} />
                    <div className="relative flex items-center">
                        <span hidden={!errors.password} className="m-1 text-xs text-red-500">{`${errors?.password?.message}`}</span>
                    </div>
                </div>
                <div className="flex items-start flex-col justify-start">
                    <Label htmlFor="confirmPassword" className=" text-sm mb-2 block">Confirm Password</Label>
                    <Input {...register('confirmPassword', { required: 'Password field is required' })} placeholder="Confirm Password" type="password" id="confirmPassword" className={`${errors.confirmPassword ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} />
                    <div className="relative flex items-center">
                        <span hidden={!errors.confirmPassword} className="m-1 text-xs text-red-500">{`${errors?.confirmPassword?.message}`}</span>
                    </div>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full button">{isSubmitting ? <SpinnerButton /> : 'Register'}</button>
            </form>

            <div className="mt-4 text-center">
                <span className="text-gray-800 text-sm !mt-8 text-center">Already have an account? </span>
                <Link to={'/auth/login'} className="text-gray-800 hover:underline ml-1 whitespace-nowrap font-semibold">Login</Link>
            </div>
        </div>

    )
}

export default Register