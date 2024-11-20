import { Link } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth"
import { motion } from 'framer-motion'
import { Menu } from "lucide-react"
import { useUIStore } from "../../../store/ui/sidebar"

const Navbar = () => {

    const { logout } = useAuthStore()
    const { openSideMenu } = useUIStore();

    return (
        <>
            <nav className="fade-in block w-full max-w-screen-xl px-4 py-2 mx-auto text-white bg-white shadow-md rounded-2xl lg:px-8 lg:py-3 mt-10">
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0 flex items-center ">
                            <button onClick={() => { openSideMenu() }} className="flex justify-start pe-8">
                                <Menu color="#000000" />
                            </button>
                            <motion.div className="p-4" initial={{ opacity: 0 }} animate={{
                                opacity: 1,
                                transition: { delay: 0.5, duration: 0.3, ease: 'easeInOut' }
                            }}>
                                <Link to={'/'} className="flex items-center">
                                    <img className="h-4 w-auto" src="/nextia_logo.png" alt="" />
                                </Link>
                            </motion.div>
                        </div>
                </div>
            </nav>
        </>
    )

}


export default Navbar