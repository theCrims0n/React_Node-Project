import { useAuthStore } from "../../../store/auth/auth"
import { useChatStore } from "../../../store/chat/chat"

interface Props {
    data: {
        isLoading: boolean,
        chats: any[]
    }
}

const ChatsBar = ({ data }: Props) => {

    const { chats, isLoading } = data

    const { setAllMessages, usersConnected, setSocketKey, chat_id } = useChatStore()
    const { user }: any = useAuthStore()

    return (
        <div className="flex h-full overflow-y bg-white rounded-xl w-80">
            <div className="flex-1 m-2">
                <header className="bg-white p-2 text-gray-700">
                    <h1 className="text-2xl font-semibold">Chats</h1>
                </header>
                <div className="overflow-y-auto fade-in">
                    {
                        chats.map((chat: any, index: number) => {
                            return (
                                <button onClick={() => [setAllMessages(chat.id), setSocketKey(usersConnected.filter(f => f.user_id == (user.id == chat.to_id ? chat.from_id : chat.to_id))[0]?.id, chat.to_id)]} key={index} className="fade-in flex flex-row cursor-pointer hover:bg-gray-100 rounded-xl p-2 justify-start w-full">
                                    <div className="inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
                                        <span className="font-medium text-sm text-gray-100 dark:text-gray-100 uppercase">{chat.name[0] + chat.lastname[0]}</span>
                                    </div>
                                    <div className="flex flex-col max-w-96 rounded-lg items-start justify-center ml-2">
                                        <p className="text-gray-800 text-md">{chat.name + ' ' + chat.lastname}</p>
                                        <p className="text-gray-400 text-sm">{chat.message}</p>
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default ChatsBar