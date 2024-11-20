import { useForm } from "react-hook-form"
import { useAuthStore } from "../../../store/auth/auth"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SpinnerButton from "../../../components/ui/spinner/Spinner-Button"
import { Input } from '../../../components/ui/input/Input'
import { Label } from "../../../components/ui/label/Label"
import { Eye, EyeOff, Mail } from "lucide-react";
import { motion } from 'framer-motion'

const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm()

    const { login, token, isAuthentic, isLogged, isLoading, errorMessage, clear } = useAuthStore()

    const navigate = useNavigate()

    const [state, setState] = useState(false)

    const onSubmit = (body: any) => {
        try {
            login(body)
        } catch (error) {
            console.log(error)
        }
        finally {

        }
    }
    useEffect(() => {
        if (isSubmitSuccessful && isAuthentic) {
            navigate('/')
        } else {
            clear()
        }
    }, [])

    return (

        <div className="p-8 rounded-2xl bg-white shadow ">
            <div className="place-items-center m-6">
                <motion.div initial={{ opacity: 0 }} animate={{
                    opacity: 1,
                    transition: { delay: 0.5, duration: 0.2, ease: 'easeInOut' }
                }}>
                    <img className="place-items-center h-7 w-auto" src="/nextia_logo_enhanced.png" alt="" />
                </motion.div>
            </div>
            <form onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="h-full">
                    <Label className="text-sm mb-2 block">Email</Label>
                    <div className="relative flex items-center">
                        <Input {...register('email', { required: true })} type="email" placeholder="Enter email"
                            className={!errors.email ? 'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30' : ''}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-4 text-muted-foreground/80 peer-disabled:opacity-50">
                            <Mail size={16} strokeWidth={2} color="#585656" aria-hidden="true" />
                        </div>

                    </div>
                    <div className="relative flex items-center">
                        <span hidden={!errors.email} className="m-1 text-xs text-red-500">{'Email field is required'}</span>
                    </div>
                </div>

                <div >
                    <div className="space-y-2">
                        <Label className="text-sm mb-2 block">Password</Label>
                        <div className="relative">
                            <Input
                                {...register('password', { required: true })}
                                id="input-23"
                                className={errors.password ? 'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30' : ''}
                                placeholder="Password"
                                type={state ? "text" : "password"}
                            />
                            <button
                                type='button'
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={() => setState(!state)}
                                aria-label={state ? "Hide password" : "Show password"}
                                aria-pressed={state}
                                aria-controls="password"
                            >
                                {state ? (
                                    <EyeOff color="#585656" className="w-4 h-4 absolute right-4" size={16} strokeWidth={2} aria-hidden="true" />
                                ) : (
                                    <Eye color="#585656" className="w-4 h-4 absolute right-4" size={16} strokeWidth={2} aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="relative flex items-center">
                        <span hidden={!errors.password} className="m-1 text-xs text-red-500">{'Password field is required'}</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <Label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                            Remember me
                        </Label>
                    </div>
                    <div className="text-sm">
                        <Link to={'/auth/recovery'} className="text-gray-800 hover:underline font-semibold">Forgot your password?</Link>
                    </div>
                </div>

                <div className="!mt-8">
                    <button disabled={isLoading} type="submit" className="w-full button">
                        {isLoading ?
                            <SpinnerButton />
                            : 'Log In'}
                    </button>
                </div>
                <span className="m-1 text-sm text-red-500" hidden={!errorMessage} >{errorMessage}</span>
                <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account?
                    <Link to={'/auth/register'} className="text-gray-800 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link>
                </p>
            </form>
        </div>

    )
}

export default Login