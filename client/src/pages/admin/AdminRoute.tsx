import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../../components/ui/navbar/Navbar"
import Footer from "../../components/ui/footer/Footer"
import { useAuthStore } from "../../store/auth/auth"
import { Sidebar } from "../../components/ui/sidebar/SideBar"
import { useUIStore } from "../../store/ui/sidebar"

const AdminRoute = () => {

    const { user }: any = useAuthStore()
    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    if (user?.role_id != 1) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
        <>
            <main className={`fade-in flex flex-col min-h-screen shrink min-w-96 `} >
                    <Outlet />
            </main>
        </>
    )
}

export default AdminRoute