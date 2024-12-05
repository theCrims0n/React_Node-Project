import { create } from 'zustand'
import { Users } from '../../interface/users/users';
import axios from '../../axios/axios';
import { toast } from 'sonner';
import { Roles } from '../../interface/roles/roles';

interface State {
    isLoading: boolean;
    user: Users[],
    users: Users[],
    to: string,
    from: string,
    getUsers: () => void;
    setSocketKey: (to: string) => void;

}

export const useChatStore = create<State>()(
    (set) => ({
        isLoading: true,
        user: [],
        users: [],
        to: '',
        from: '',
        getUsers: async () => {

            try {
                const reponse = await axios.get('/api/chat/users')
                const { users } = reponse.data.result
                set({ users: users })
            } catch (error: any) {
                toast.error(error)
            }

        },
        setSocketKey: async (to: string) => {
            try {
                console.log(to)
                set({ to: to })
            } catch (error: any) {
                toast.error(error)
            }

        },
    })
)