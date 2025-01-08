import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import { useForm } from 'react-hook-form';
import { SendHorizonal } from 'lucide-react';
import { useChatStore } from '../../../store/chat/chat';
import { useAuthStore } from '../../../store/auth/auth';

interface Props {
    chatArray: any[]
}

export function ChatForm({ chatArray = [] }: Props) {

    const { register, handleSubmit, resetField } = useForm<any>()
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const { to, setMessage, newMessage, chat_id } = useChatStore()
    const { user } = useAuthStore()

    const onSubmit = async (data: any) => {
        setText('')
        const { message } = data
        if (!message) { return }
        const { id: from_id }: any = user
        setMessage(message, to, from_id, chat_id)
        resetField('message')
    }

    useEffect(() => {
        socket.emit('getUsersConnected')
        socket.on('getUsersConnected', function (users) {
            const user: any = users?.filter((f: any) => f.id == to)[0]
            if (user != undefined) {
                setName(user?.name + ' ' + user?.lastname)
            }
        })
    }, [to])

    return (
        <div className="flex flex-col bg-white rounded-lg  w-full max-w-[calc(120svh_-_10rem)] min-w-96">
            {to?.trim().length > 0 &&
                <>
                    <header className="border-2 border-sky-200 m-1 text-center rounded-lg border-b border-gray-300 items-center bg-white text-slate-900 ">
                        <h1 className="font-medium text-xl text-start ml-6 m-1">{name == '' ? 'Welcome to chat' : name}</h1>
                    </header>
                    <div className="relative flex-grow scroll-smooth overflow-y-auto flex flex-col-reverse mb-4 gap-4 py-4 m-2 rounded-lg border-2 border-sky-200 ">
                        <div className='ml-2 mr-2 scroll-smooth'>
                            {
                                chatArray.map((chat, index) => {
                                    const { message, date, users_id } = chat
                                    const time = new Date(date)
                                    const hours = time.getHours()
                                    const minutes = time.getMinutes()
                                    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                                    const { id }: any = user
                                    const me = users_id == id ? true : false
                                    return (
                                        <div key={index} className={`flex ${me ? 'justify-end' : 'justify-start'}`} >
                                            <div className="bg-gray-100 rounded-lg rounded-tl-none px-4 py-2 m-1 max-w-[45%] line-clamp overflow-hidden">
                                                <p className="text-black text-sm font-normal w-full line-clamp break-words" >{message}</p>
                                                <div className="flex justify-end">
                                                    <p className="text-gray-400 text-xs w-full flex justify-end" >{formattedTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-16 mb-2 ">
                        <form id='form' onSubmit={handleSubmit(onSubmit)} className='fade-in flex space-x-4 mr-2 ml-2 w-full transition-all duration-500'>
                            <textarea placeholder='Type a message' {...register('message', { onChange: (e) => setText(e.target.value) })}
                                className="h-full flex w-full font-normal rounded border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50" />
                            {text?.trim().length > 0 && <button type='submit' className='fade-in'><SendHorizonal size={32} color="#353536" /></button>}
                        </form>
                    </div>
                </>
            }
        </div >
    );
}
