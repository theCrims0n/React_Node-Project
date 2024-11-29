import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Users } from '../../interface/users/users';
import axios from '../../axios/axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface AuthStore {
    isLogged: boolean;
    isLoading: boolean;
    isAuthentic: boolean;
    user: Users[],
    token: string,
    errorMessage: '';
    login: (body: Users) => void;
    logout: () => void;
    verify: () => void;
    signup: (body: Users) => void;
    recover: (email: string, password: string) => void;
    clear: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLogged: false,
            isLoading: true,
            isAuthentic: false,
            user: [],
            token: '',
            errorMessage: '',
            login: async (body) => {
                try {
                    set({ isLoading: true, isAuthentic: false, errorMessage: '' })
                    axios.defaults.withCredentials = true;
                    const result = await axios.post(`/api/auth/login/`, body, { withCredentials: true })
                    const { user, token } = result.data
                    //Cookies.set('token', token)
                    set({ user: user, token: token, isAuthentic: true, isLogged: true, errorMessage: '', isLoading: false })
                } catch (error: any) {
                    const { mssge } = error.response.data
                    set({ isLoading: false, isAuthentic: false, errorMessage: mssge })
                    return
                }
            },
            logout: async () => {
                try {
                    set({ isLoading: true })
                    const result = await axios.get(`/api/auth/logout/`)
                    if (result.status == 200) {
                        Cookies.remove('token')
                        set({ isAuthentic: false, isLoading: false })
                        return
                    }
                } catch (error) { }
            },
            verify: async () => {
                try {
                    set({ isLoading: true })
                    const result = await axios.get(`/api/auth/verify`)
                    if (result.status != 200) {
                        Cookies.remove('token')
                        set({ isAuthentic: false, isLoading: false })
                        return
                    }
                    set({ isAuthentic: true, isLoading: false })
                    return result
                } catch (error) {
                    console.log(error)
                    Cookies.remove('token')
                    toast.error('Unauthenticated user')
                    set({ isAuthentic: false, isLoading: false })
                }
            },
            signup: async (body) => {
                try {
                    set({ isLoading: true })
                    const result = await axios.post('/api/auth/signup/', body)
                    set({ isLoading: false, user: result.data })
                    toast.success('User registered succesfully')
                    return result

                } catch (error: any) {
                    const { mssge } = error.response.data
                    console.log(error)
                    toast.error(mssge)
                    set({ isLoading: false, isAuthentic: false, errorMessage: mssge })
                }

            },
            recover: async (email, password) => {
                try {
                    set({ isLoading: true })
                    const result = await axios.put('/api/auth/recover/', { email, password })
                    console.log(result)
                    set({ isLoading: false, user: result.data })
                    return result

                } catch (error: any) {
                    const { mssge } = error.response.data
                    console.log(mssge)
                    set({ isLoading: false, isAuthentic: false, errorMessage: mssge })
                }
            },
            clear: () => {
                set({ isAuthentic: false, isLoading: false, errorMessage: '', user: [], token: '' })
            }
        }),
        {
            name: 'userLoginStatus',
        }))