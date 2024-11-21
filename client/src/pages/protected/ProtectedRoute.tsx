import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../../components/ui/navbar/Navbar"
import Footer from "../../components/ui/footer/Footer"
import { useAuthStore } from "../../store/auth/auth"
import { Sidebar } from "../../components/ui/sidebar/SideBar"
import { useUIStore } from "../../store/ui/sidebar"

const ProtectedRoute = () => {

    const { isAuthentic } = useAuthStore()
    const { isSideMenuOpen, closeSideMenu } = useUIStore();

    if (!isAuthentic) {
        return (
            <Navigate to={'/auth/login'} />
        )
    }

    return (
        <>

            <main className={`fade-in flex flex-col min-h-screen`} >
                <Sidebar />
                <Navbar />
                {isSideMenuOpen && (
                    <>
                        <div onClick={closeSideMenu}
                            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                    </>
                )}
                <div onClick={closeSideMenu} className={`flex flex-col flex-grow`} >
                    <Outlet />
                </div>
                <Footer />
            </main>
        </>
    )
}

export default ProtectedRoute