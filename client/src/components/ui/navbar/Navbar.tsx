import { Link } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth"
import { motion } from 'framer-motion'
import { LogOut, Menu, Settings, User, UserCircle, UserRoundPen } from "lucide-react"
import { useUIStore } from "../../../store/ui/sidebar"
import { useEffect, useRef, useState } from "react"

const Navbar = () => {

    const { logout } = useAuthStore()
    const { openSideMenu } = useUIStore();
    const [open, setOpen] = useState(true)
    const ref: any = useRef(null)

    const handleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);


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
                    <div ref={ref} className="relative ml-3">
                        <div>
                            <button onClick={handleOpen} type="button" className="relative flex rounded-full text-sm focus:outline" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <UserCircle color="black" className="transition-all duration-500" strokeWidth={!open ? 2 : 1.5}/>
                            </button>
                        </div>
                        <menu key={Number(open)} hidden={open} className="absolute rounded-md right-0 z-10 mt-2  w-48 origin-top-right  bg-white py-1 shadow-lg ring-1 focus:outline" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                            <div className="m-1">
                                <Link onClick={handleOpen} to="/perfil" className="block px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 flex items-center " role="menuitem" id="user-menu-item-0"><UserRoundPen size={16} /><span className="ml-3"> Your Profile</span></Link>
                                <Link onClick={handleOpen} to="#" className="block px-4 py-2  rounded-md text-sm text-gray-700 hover:bg-gray-100 flex items-center " role="menuitem" id="user-menu-item-1"><Settings size={16} /><span className="ml-3">Settings</span></Link>
                                <button onClick={() => [handleOpen(), logout()]} className="w-full rounded-md block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center " role="menuitem" id="user-menu-item-2"><LogOut size={16} /><span className="ml-3">Sign out</span></button>
                            </div>
                        </menu>
                    </div>
                </div>
            </nav>
        </>
    )

}


export default Navbar