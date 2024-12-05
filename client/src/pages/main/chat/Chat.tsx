
import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import { ChatForm } from '../../../components/chat/chat-form/ChatForm';
import Connected from '../../../components/chat/connected/Connected';
import { useAuthStore } from '../../../store/auth/auth';


const Chat = () => {

    const { user } = useAuthStore()

    useEffect(() => {
        socket.emit('enterChat', user)
        socket.emit('getUsersConnected')
    }, [])

    return (
        <>
            <div className='flex justify-center min-w-screen'>
                <div className="App flex justify-center space-x-4 h-[calc(60svh_-_10rem)] w-[calc(80%_-_0rem)] min-h-[calc(80svh_-_10rem)]" >
                    <Connected />
                    <ChatForm />
                </div>
            </div>
        </>
    )
}

export default Chat