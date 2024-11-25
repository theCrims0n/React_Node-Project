import { useEffect } from "react"
import Card from "../../components/ui/card/Card"
import Spinner from "../../components/ui/spinner/Spinner"
import { useAuthStore } from "../../store/auth/auth"
import { useUsersStore } from "../../store/users/users"
import ChartJs from "../../components/ui/chart/Chart"
import { DataMap } from "../../components/ui/datamap/DataMap"
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
                : <>
                    <div className="flex flex-wrap justify-center mt-12">
                        <Card values={{ count: users?.length, title: 'Users', subtitle: 'Number of users' }} />
                        <Card values={{ count: 1, title: 'Invitations', subtitle: 'Number of invitations' }} />
                        <Card values={{ count: 1, title: 'Invitations', subtitle: 'Number of invitations' }} />
                        <Card values={{ count: 1, title: 'Invitations', subtitle: 'Number of invitations' }} />

                    </div>
                    <div  className="w-full flex flex-wrap justify-center">
                    <ChartJs/>
                    <DataMap />
                    </div>
                </>
        }

    </>)
}

export default Home