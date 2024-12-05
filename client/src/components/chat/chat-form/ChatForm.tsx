import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket/socket';
import { useForm } from 'react-hook-form';
import { SendHorizonal } from 'lucide-react';
import { useChatStore } from '../../../store/chat/chat';

export function ChatForm() {

    const { register, handleSubmit, resetField } = useForm<any>()
    const [text, setText] = useState('');
    const [name, setName] = useState('');

    const messageList: any = useRef(null);
    const { to } = useChatStore()

    const onSubmit = async (data: any) => {
        setText('')
        const { message } = data
        if (!message) { return }
        socket.emit('privateMessage', { message, to, from: socket.id })
        resetField('message')
    }

    const renderMessage = (name: string, message: string, date: Date, me: boolean) => {

        let html = ''
        const time = new Date(date)
        const hour = time.getHours() + ':' + time.getMinutes()

        html = me ?
            `
            <div class="flex justify-end fade-in">
                <div class="bg-gray-100 rounded-lg rounded-tl-none px-4 py-2 m-1 max-w-[45%] line-clamp-[33] overflow-hidden">
                    <p class="text-black text-sm font-medium w-full line-clamp-[33]" >${message}</p>
                    <div class="flex justify-end">
                        <p class="text-gray-400 text-xs w-full flex justify-end" >${hour}</p>
                    </div>
                </div>

            </div>`
            :
            `
            <div class="flex justify-start fade-in">
                <div class="bg-gray-100 rounded-lg rounded-tl-none px-4 py-2 m-1 max-w-[45%] line-clamp-[33] overflow-hidden">
                    <p class="text-black text-sm font-medium w-full line-clamp-[33]" >${message}</p>
                    <div class="flex justify-end">
                        <p class="text-gray-400 text-xs w-full flex justify-end" >${hour}</p>
                    </div>
                </div>
            </div>`
        messageList.current?.insertAdjacentHTML('beforeend', html);
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

    useEffect(() => {
        socket.on('privateMessage', ({ name, message, date, me }) => {
            socket.id === me ? renderMessage(name, message, date, true) : renderMessage(name, message, date, false)
        })
    }, [])


    return (
        <div className="flex flex-col bg-white rounded-lg  w-full max-w-[calc(120svh_-_10rem)] min-w-96">
            {to.trim().length > 0 &&
                <>
                    <header className="border-2 border-sky-200 m-1 text-center rounded-lg border-b border-gray-300 items-center bg-white text-slate-900 ">
                        <h1 className="font-medium text-xl text-start ml-6 m-1">{name}</h1>
                    </header>
                    <div className="relative flex-grow scroll-smooth overflow-y-auto flex flex-col-reverse mb-4 gap-4 py-4 m-2 rounded-lg border-2 border-sky-200 ">
                        <div className='ml-2 mr-2 scroll-smooth' ref={messageList} />
                    </div>
                    <div className="flex justify-center items-center h-16 mb-2 ">
                        <form id='form' onSubmit={handleSubmit(onSubmit)} className='fade-in flex space-x-4 mr-2 ml-2 w-full transition-all duration-500'>
                            <textarea placeholder='Type a message' {...register('message', { onChange: (e) => setText(e.target.value) })} typeof='submit'
                                className="h-full flex max-h-10 min-h-10 w-full font-normal rounded border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50" />
                            {text.trim().length > 0 && <button type='submit' className='fade-in'><SendHorizonal size={32} color="#353536" /></button>}
                        </form>
                    </div></>}
        </div>
    );
}
