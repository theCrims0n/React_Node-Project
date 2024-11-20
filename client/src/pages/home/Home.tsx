import { useEffect } from "react"
import Card from "../../components/ui/card/Card"
import Spinner from "../../components/ui/spinner/Spinner"
import { useAuthStore } from "../../store/auth/auth"
import { useUsersStore } from "../../store/users/users"

const Home = () => {

    const { isLoading } = useAuthStore()
    const { users, getUsers } = useUsersStore()

    useEffect(() => {
        getUsers()
    }, [])

    return (<>
        {
            isLoading
                ?
                <Spinner />
                :
                <div className="m-12 flex items-stretch">
                    <Card values={{ count: users.length, title: 'Users', subtitle: 'Number of users' }} />
                    <Card values={{ count: 1, title: 'Invitations', subtitle: 'Number of invitations' }} />
                </div>
        }

    </>)
}

export default Home