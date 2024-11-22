import clsx from "clsx";
import { useUIStore } from "../../../store/ui/sidebar";
import { LogOut, Mail, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/auth/auth";


export const Sidebar = () => {
    const { isSideMenuOpen, closeSideMenu } = useUIStore();
    const { logout } = useAuthStore()
    return (
        <div>
            <nav
                className={`bg-gradient-to-t from-zinc-200 shadow-inner top-0 left-0 w-[250px] bg-white  fixed h-full z-40  ease-in-out duration-300 ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>

                <div
                    className="me-4 pt-8 flex bg-transparent items-center justify-center rounded-md text-white dark:text-zinc-950">
                    <img src="/nextia_logo.png" className="bg-transparent" alt="" />
                </div>
                <X
                    size={30}
                    className="absolute top-7 right-5 cursor-pointer"
                    onClick={() => closeSideMenu()}
                />
                <div className="mt-8 h-px bg-zinc-200 dark:bg-black/14"></div>
                <div className="relative flex flex-col space-y-2 p-2">
                    <Link
                        to="/users/list/1"
                        onClick={() => closeSideMenu()}
                        className="hover:bg-zinc-900 hover:ml-1  rounded-md hover:text-white w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <User size={25} />
                        <span className="ml-3 text-md ">Users</span>
                    </Link>
                    <div className="h-px bg-zinc-200 dark:bg-black/14"></div>
                    <Link
                        to="/invitations/list/1"
                        onClick={() => closeSideMenu()}
                        className="hover:bg-zinc-900 hover:ml-1 rounded-md hover:text-white flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <Mail size={25} />
                        <span className="ml-3 text-md ">Invitations</span>
                    </Link><div className="mt-8 h-px bg-zinc-200 dark:bg-black/14"></div>
                    <button
                        className="hover:bg-zinc-900 hover:ml-1 rounded-md hover:text-white flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => [logout(), closeSideMenu()]}
                    >
                        <LogOut size={30} />
                        <span className="ml-3 text-md">Logout</span>
                    </button>
                </div>
                <div className="w-full h-full mt-32 bg-gradient-to-t from-zinc-800
                    border-t-[120px] border-t-transparent
                    border-r-[250px] border-r-zinc-950">
                </div>
            </nav>
        </div>
    );
};
