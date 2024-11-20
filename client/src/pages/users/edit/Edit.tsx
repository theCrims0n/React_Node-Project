import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth";
import { useEffect } from "react";
import SpinnerButton from "../../../components/ui/spinner/Spinner-Button";
import validateEmail from "../../../helper/validator";
import { Input } from '../../../components/ui/input/Input'
import { Label } from "../../../components/ui/label/Label";
import { useUsersStore } from "../../../store/users/users";
import Spinner from "../../../components/ui/spinner/Spinner";
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import { PasswordInput } from "../../../components/ui/password/PasswordInput";

const EditUser = () => {

    const { id } = useParams()


    const { getUserById, isLoading, user, editUser, errorMessage, clear } = useUsersStore()

    const { register, handleSubmit, reset, setError, formState: { isSubmitting, errors } } = useForm<any>({
        values: {
            name: user[0]?.name, lastname: user[0]?.lastname,
            email: user[0]?.email, password: user[0]?.password, confirmPassword: user[0]?.password, department: user[0]?.department,
        }
    });


    const navigate = useNavigate()

    useEffect(() => {
        clear()
        //reset()
        if (id) {
            getUserById(id)
        }
    }, [id])

    const onSubmit = async (data: any) => {
        try {

            clear()

            const { password, confirmPassword, email, department, name, lastname } = data

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
            data = { id, password, department, email, name, lastname }
            const result: any = await editUser(data)
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
        <>
            {
                isLoading && user
                    ?
                    <Spinner />
                    :
                    <div className="w-dvw fade-in max-w-lg mx-auto  bg-white shadow  rounded-lg shadow-md m-20 px-8 py-10 flex flex-col ">
                        <div className="justify-start pb-2">
                            <Link to={'/users/list'}><button className=" button">Go back</button></Link>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                            <div className="flex w-full justify-center items-center space-x-4">
                                <div className="flex items-start flex-col justify-start w-full">
                                    <Label htmlFor="name" className="text-gray-800 text-sm mb-2 block">Name</Label>
                                    <Input defaultValue={user[0]?.name} {...register('name', { required: 'Name is required' })} placeholder="Enter Name" type="text" id="name" />
                                    <span className="m-1 text-xs text-red-500" hidden={!errors.name}>{`${errors?.name?.message}`}</span>

                                </div>
                                <div className="flex items-start flex-col justify-start w-full">
                                    <Label htmlFor="lastname" className="text-gray-800 text-sm mb-2 block">Last Name</Label>
                                    <Input defaultValue={user[0]?.lastname} {...register('lastname', { required: 'Last Name is required' })} placeholder="Enter Last Name" type="text" id="lastname" />
                                    <span className="m-1 text-xs text-red-500" hidden={!errors.lastname}>{`${errors?.lastname?.message}`}</span>

                                </div>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="email" className="text-gray-800 text-sm mb-2 block">Email</Label>
                                <Input defaultValue={user[0]?.email} {...register('email', { required: 'Email is required' })} placeholder="Enter Email" type="text" id="email" name="email" />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.email}>{`${errors?.email?.message}`}</span>
                                <span className="m-1 text-xs text-red-500" hidden={!errorMessage}>{`${errorMessage}`}</span>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="password" className="text-gray-800 text-sm mb-2 block">Password</Label>
                                <PasswordInput defaultValue={user[0]?.password} {...register('password', { required: 'Password is required' })} />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.password}>{`${errors?.password?.message}`}</span>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="confirmPassword" className="text-gray-800 text-sm mb-2 block">Confirm Password</Label>
                                <Input defaultValue={user[0]?.password} {...register('confirmPassword', { required: true })} placeholder="Confirm Password" type="password" id="confirmPassword" className={`${errors.confirmPassword ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.confirmPassword}>{`${errors?.confirmPassword?.message}`}</span>
                            </div>
                            <div className="flex items-start flex-col justify-start">
                                <Label htmlFor="department" className="text-gray-800 text-sm mb-2 block">Department</Label>
                                <Input defaultValue={user[0]?.department} {...register('department', { required: 'Department is required' })} placeholder="Enter department" type="number" id="department" className={` ${errors.confirmPassword ? 'focus:outline-none focus:ring focus:border-2 border-rose-500' : ''}`} />
                                <span className="m-1 text-xs text-red-500" hidden={!errors.department}>{`${errors?.department?.message}`}</span>
                            </div>
                            <button disabled={isSubmitting} type="submit" className="w-full button">{isSubmitting ? <SpinnerButton /> : 'Edit'}</button>
                        </form>
                    </div>
            }
        </>
    )
}

export default EditUser