import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react";
import SpinnerButton from "../../../../components/ui/spinner/Spinner-Button";
import validateEmail from "../../../../helper/validator";
import { Input } from '../../../../components/ui/input/Input'
import { Label } from "../../../../components/ui/label/Label";
import { useUsersStore } from "../../../../store/users/users";
import Spinner from "../../../../components/ui/spinner/Spinner";
import { PasswordInput } from "../../../../components/ui/password/PasswordInput";
import Form from "../../../../components/ui/form/Form";
import { useAuthStore } from "../../../../store/auth/auth";

const ProfileEditUser = () => {

    const { getUserById, isLoading, user, editUser, errorMessage, clear, roles } = useUsersStore()

    const { user: userAuth }: any = useAuthStore()

    const { id } = userAuth

    const { register, handleSubmit, reset, setError, formState: { isSubmitting, errors } } = useForm<any>({
        values: {
            name: user[0]?.name, lastname: user[0]?.lastname,
            email: user[0]?.email, password: user[0]?.password, confirmPassword: user[0]?.password
        }
    });


    const navigate = useNavigate()

    useEffect(() => {
        clear()
        if (id) {
            getUserById(id)
        }
    }, [id])

    const onSubmit = async (data: any) => {
        try {

            clear()

            const { password, confirmPassword, email, name, lastname } = data

            const isValidEmail = validateEmail(email)
            if (!isValidEmail) {
                setError('email', { type: 'pattern', message: 'Email with invalid format' })
                return
            }

            if (password != confirmPassword) {
                setError('confirmPassword', { type: 'custom', message: 'The two passwords do not match' })
                return
            }

            if (password.length < 5) {
                setError('password', { type: 'minLength', message: 'Password must have at least 5 letters' })
                return
            }
            data = { id, password, name, lastname, email }
            const result: any = await editUser(data)
            if (result.status != 200) {
                return
            }
            navigate('/profile')


        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        clear()
    }, [])

    return (
        <>
            {
                isLoading || user.length == 0
                    ?
                    <Spinner />
                    :
                    <Form>
                        <h1 className="font-medium text-lg mb-4 text-slate-800">Edit your profile</h1>
                        <form onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 font-medium">
                            <div className="flex w-full justify-center items-center space-x-4">
                                <div className="flex items-start flex-col justify-start w-full">
                                    <Label htmlFor="name" className="text-slate-800 text-sm mb-2 block">Name</Label>
                                    <Input defaultValue={user[0]?.name} {...register('name', { required: 'Name is required' })} autoComplete="name" placeholder="Enter Name" type="text" id="name" />
                                    <span className="m-1 text-xs text-red-500" hidden={!errors.name}>{`${errors?.name?.message}`}</span>
                                </div>
                                <div className="flex items-start flex-col justify-start w-full">
                                    <Label htmlFor="lastname" className="text-slate-800 text-sm mb-2 block">Last Name</Label>
                                    <Input defaultValue={user[0]?.lastname} {...register('lastname', { required: 'Last Name is required' })} placeholder="Enter Last Name" type="text" id="lastname" />
                                    <span className="m-1 text-xs text-red-500" hidden={!errors.lastname}>{`${errors?.lastname?.message}`}</span>
                                </div>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="email" className="text-slate-800 text-sm mb-2 block">Email</Label>
                                <Input defaultValue={user[0]?.email} {...register('email', { required: 'Email is required' })} autoComplete="email" placeholder="Enter Email" type="text" id="email" name="email" />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.email}>{`${errors?.email?.message}`}</span>
                                <span className="m-1 text-xs text-red-500" hidden={!errorMessage}>{`${errorMessage}`}</span>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="password" className="text-slate-800 text-sm mb-2 block">Password</Label>
                                <PasswordInput defaultValue={user[0]?.password} {...register('password', { required: 'Password is required' })} />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.password}>{`${errors?.password?.message}`}</span>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="confirmPassword" className="text-slate-800 text-sm mb-2 block">Confirm Password</Label>
                                <Input defaultValue={user[0]?.password} {...register('confirmPassword', { required: true })} placeholder="Confirm Password" type="password" id="confirmPassword" className={`${errors.confirmPassword ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.confirmPassword}>{`${errors?.confirmPassword?.message}`}</span>
                            </div>
                            <div className="flex items-stretch mt-2 ">
                                <Link to={'/'}><button className="buttonCancel">Cancel</button></Link>
                                <div className="pl-2 w-full">
                                    <button disabled={isSubmitting} type="submit" className=" w-full button">{isSubmitting ? <SpinnerButton /> : 'Edit'}</button>
                                </div>
                            </div>
                        </form>
                    </Form>
            }
        </>
    )
}

export default ProfileEditUser