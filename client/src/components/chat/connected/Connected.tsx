import { useEffect, useState } from "react"
import { socket } from "../../../socket/socket";
import SpinnerCard from "../../ui/spinner/Spinner-Card";
import { useChatStore } from "../../../store/chat/chat";


const Connected = () => {

    const [users, setUsers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { setSocketKey } = useChatStore()

    useEffect(() => {
        setIsLoading(true)
        socket.on('getUsersConnected', function (users) {
            setUsers(users?.filter((f: any) => f.id != socket.id))
            setIsLoading(false)
        })

    }, [])


    return (
        <div className="flex h-full overflow-y bg-white rounded-xl w-80">

            <div className="flex-1">
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">Chats</h1>
                </header>

                <div className="h-screen overflow-y-auto m-2 ">
                    {
                        isLoading
                            ?
                            <SpinnerCard />
                            :
                            users.map((user: any, index: number) => {
                                return (
                                    <div onClick={() => setSocketKey(user.id)} key={index} className="flex flex-row cursor-pointer hover:bg-gray-100 rounded-xl p-2 justify-start">
                                        <div className="inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
                                            <span className="font-medium text-gray-100 dark:text-gray-100 uppercase">{user.name[0] + user.lastname[0]}</span>
                                        </div>
                                        <div className="flex max-w-96 rounded-lg justify-center mt-1 ml-1">
                                            <p className="text-gray-700">{user.name + ' ' + user.lastname}</p>
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