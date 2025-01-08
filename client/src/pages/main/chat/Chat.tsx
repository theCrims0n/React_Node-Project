
import { useEffect, useState } from 'react';
import { ChatForm } from '../../../components/chat/chat-form/ChatForm';
import Connected from '../../../components/chat/connected/Connected';
import { useAuthStore } from '../../../store/auth/auth';
import { useChatStore } from '../../../store/chat/chat';
import ChatsBar from '../../../components/chat/chats-bar/ChatsBar';

const Chat = () => {

    const { user } = useAuthStore()
    const { getUsers, usersConnected: users, isLoading, connectSocket, setLastMessages, to, chats, allChats, newMessage } = useChatStore();

    useEffect(() => {
        getUsers()
        const exist = users.filter(f => f?.email == user[0]?.email).length > 0 ? true : false
        if (!exist) {
            setTimeout(() => {
                connectSocket(user)
                getUsers()
                setLastMessages()
            }, 100);
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLastMessages()
        }, 100);
    }, [to, newMessage])

    return (
        <div className='flex justify-center min-w-screen overflow-hidden'>
            <div className="App flex justify-center space-x-4 h-[calc(60svh_-_10rem)] w-[calc(80%_-_0rem)] min-h-[calc(80svh_-_10rem)]" >
                <div className='flex flex-col justify-center items-center space-y-4 '>
                    <Connected data={{ users, isLoading }} />
                    <ChatsBar data={{ chats, isLoading }} />
                </div>
                <ChatForm chatArray={allChats} />
            </div>
        </div>
    )
}

export default Chat