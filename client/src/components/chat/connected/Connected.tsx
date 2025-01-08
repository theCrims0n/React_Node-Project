import SpinnerCard from "../../ui/spinner/Spinner-Card";
import { useChatStore } from "../../../store/chat/chat";

interface Props {
    data: {
        isLoading: boolean,
        users: any[]
    }
}

const Connected = ({ data }: Props) => {

    const { users, isLoading } = data

    const { setSocketKey, chats } = useChatStore()

    const fromList = chats.map((f: any) => f.from_id)
    const toList = chats.map((f: any) => f.to_id)

    return (
        <div className="flex h-96 overflow-y bg-white rounded-xl w-80">
            <div className="flex-1  m-2">
                <header className="bg-white p-2 text-gray-700">
                    <h1 className="text-2xl font-semibold">Contacts</h1>
                </header>
                <div className="overflow-y-auto fade-in">
                    {
                        users.filter(f => !fromList.includes(f.user_id) && !toList.includes(f.user_id)).map((user: any, index: number) => {
                            return (
                                <div onClick={() => setSocketKey(user.id, user.user_id)} key={index} className="fade-in flex flex-row cursor-pointer hover:bg-gray-100 rounded-xl p-2 justify-start">
                                    <div className="inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
                                        <span className="font-medium text-sm text-gray-100 dark:text-gray-100 uppercase">{user.name[0] + user.lastname[0]}</span>
                                    </div>
                                    <div className="flex max-w-96 rounded-lg justify-center mt-2 ml-1">
                                        <p className="text-gray-700 text-sm">{user.name + ' ' + user.lastname}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Connected