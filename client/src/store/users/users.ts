import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Users } from '../../interface/users/users';
import axios from '../../axios/axios';
import { toast } from 'sonner';

interface State {
    isLoading: boolean;
    user: Users[],
    users: Users[],
    getUsers: () => void;
    getUserById: (id: string) => void;
    deleteUser: (id: number) => void;
    editUser: (body: Users) => void;
    registerUser: (body: Users) => void;
    errorMessage: string;
    clear: () => void;
}

export const useUsersStore = create<State>()(
    (set) => ({

        isLoading: false,
        user: [],
        users: [],
        errorMessage: '',
        getUsers: async () => {
            try {
                set({ isLoading: true })
                const result = await axios.get(`/api/users/`)
                set({ isLoading: false, users: result.data.result })

            } catch (error) {
                console.log(error)
                set({ isLoading: false, users: [] })
            }
        },
        getUserById: async (id) => {
            try {
                set({ isLoading: true, user: [] })
                const result = await axios.get(`/api/users/${id}`)
                set({ isLoading: false, user: [result.data.result] })

            } catch (error: any) {
                console.log(error)
                toast.error(error)
                set({ isLoading: false, user: [] })
            }
        },
        deleteUser: async (id) => {
            try {
                set({ isLoading: true })
                const result = await axios.delete(`/api/users/${id}`)
                set({ isLoading: false, users: result.data.result })
                toast.success('User deleted successfully')
            } catch (error: any) {
                console.log(error)
                const { mssge } = error.response.data
                toast.error(mssge)
                set({ isLoading: false })
            }

        },
        editUser: async (body) => {
            try {
                //set({ isLoading: true })
                const result = await axios.put(`/api/users/`, body)
                set({ isLoading: false })
                toast.success('User updated successfully')
                return result
            } catch (error: any) {
                console.log(error)
                const { mssge } = error.response.data
                set({ isLoading: false, errorMessage: mssge })
            }

        },
        registerUser: async (body) => {
            try {
                //set({ isLoading: true })
                const result = await axios.post('/api/auth/signup/', body)
                set({ isLoading: false, user: result.data })
                toast.success('User registered succesfully')
                return result
            } catch (error: any) {
                const { mssge } = error.response.data
                toast.error(mssge)
                set({ isLoading: false, errorMessage: mssge })
            }
        },
        clear: () => {
            set({ isLoading: false, errorMessage: '' })
        },
    }))