import { Link } from "react-router-dom"
import { useAuthStore } from "../../../store/auth/auth"
import { motion } from 'framer-motion'
import { LogOut, Menu, Settings, User, UserCircle, UserRoundPen } from "lucide-react"
import { useUIStore } from "../../../store/ui/sidebar"
import { useEffect, useRef, useState } from "react"

const Navbar = () => {

    const { logout, user } : any = useAuthStore()
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
                        <div className="flex justify-end">
                            <button onClick={handleOpen} type="button" className="relative flex rounded-full text-sm focus:outline" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800">
                                    <span className="font-medium text-gray-100 dark:text-gray-100 uppercase">{user.name[0] + user.lastname[0]}</span>
                                </div>
                            </button>
                        </div>
                        <div className="mr-52">
                            <ul
                                hidden={open}
                                data-popover="profile-menu"
                                data-popover-placement="bottom"
                                className="absolute m-2 mr-28 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
                            >
                                <Link to='/perfil' onClick={handleOpen}
                                    role="menuitem"
                                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                                    </svg>

                                    <p className="text-slate-800 font-normal ml-2">
                                        My Profile
                                    </p>
                                </Link>
                                <Link
                                    to='/'
                                    role="menuitem"
                                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                        <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                    </svg>

                                    <p className="text-slate-800 font-normal ml-2">
                                        Edit Profile
                                    </p>
                                </Link>
                                <Link
                                    to='/'
                                    role="menuitem"
                                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                        <path fill-rule="evenodd" d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z" clip-rule="evenodd" />
                                    </svg>

                                    <p className="text-slate-800 font-normal ml-2">
                                        Inbox
                                    </p>
                                </Link>
                                <Link
                                    to='/'
                                    role="menuitem"
                                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                                    </svg>

                                    <p className="text-slate-800 font-normal ml-2">
                                        Help
                                    </p>
                                </Link>
                                <hr className="my-2 border-slate-200" role="menuitem" />
                                <button
                                    onClick={() => [logout(), handleOpen()]}
                                    role="menuitem"
                                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                                        <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
                                    </svg>

                                    <p className="text-slate-800 font-normal ml-2">
                                        Log Out
                                    </p>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )

}


export default Navbar