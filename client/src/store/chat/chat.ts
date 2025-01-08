import { create } from 'zustand'
import { toast } from 'sonner';
import { socket } from '../../socket/socket';
import { persist } from 'zustand/middleware';

interface State {
    isLoading: boolean;
    to: string,
    from: string,
    usersConnected: any[],
    chats: string[],
    allChats: string[],
    chat_id: number,
    newMessage: string;
    to_id: number;
    getUsers: () => void;
    setSocketKey: (to: string, to_id: number) => void;
    setMessage: (message: string, to: string, from_id: number, chat_id: number) => void;
    setAllMessages: (id: number) => void;
    setLastMessages: () => void;
    connectSocket: (user: any) => void;
}

export const useChatStore = create<State>()(
    (set, get) => ({
        isLoading: true,
        to: '',
        from: '',
        usersConnected: [],
        chats: [],
        allChats: [],
        chat_id: 0,
        newMessage: '',
        to_id: 0,
        getUsers: () => {
            set({ isLoading: true })
            socket.emit('getUsersConnected')
            socket.on('getUsersConnected', function (users: any) {
                set({ usersConnected: users?.filter((f: any) => f.id != socket.id)! || [] })
                set({ isLoading: false })
            })
        },
        setSocketKey: async (to: string, to_id: number) => {
            try {
                set({ to: to, to_id: to_id, allChats: [] })
            } catch (error: any) {
                toast.error(error)
            }
        },
        setMessage: (message, to, from_id, chat_id = 0) => {
            const { to_id } = get()
            socket.emit('privateMessage', { message, to, from: socket.id, from_id, to_id, chat_id })
            socket.on('privateMessage', function (data) {
                if (data) {
                    const { message, chats } = data
                    set({ newMessage: message, allChats: chats.chats, chat_id: chats.chats[0].chat_id })
                }
            })
        },
        setAllMessages: (id) => {
            try {
                const { to } = get()
                set({ isLoading: true, chat_id: id })
                socket.emit('setAllMessages', { id, to })
                socket.on('setAllMessages', function (data) {
                    if (data) {
                        const { chats } = data
                        set({ allChats: chats, isLoading: false })
                    }
                })

            } catch (error: any) {
                toast.error(error)
            }
        },
        setLastMessages: () => {
            try {
                set({ isLoading: true })
                const { to } = get()
                socket.emit('setLastMessages', { to })
                socket.on('setLastMessages', function (data) {
                    if (!data) {
                        const { chats } = get()
                        set({ chats: chats })
                        set({ isLoading: false })
                        return
                    }
                    const { chats } = data
                    set({ chats: chats })
                    set({ isLoading: false })
                })
            } catch (error: any) {
                toast.error(error)
            }
        },
        connectSocket: (user) => {
            try {
                socket.disconnect()
                socket.connect();
                socket.emit('enterChat', user)
            } catch (error: any) {
                toast.error(error)
            }
        },
    }))