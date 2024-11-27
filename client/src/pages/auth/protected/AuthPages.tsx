import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth/auth";
import { motion } from 'framer-motion'

export default function AuthPages() {
    const { token, isAuthentic } = useAuthStore()

    if (token && isAuthentic) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
            <div className="fade-in min-h-screen flex flex-col items-center justify-center">
                <div className="flex h-full w-full flex-wrap items-center justify-center align-center lg:justify-stretch ">
                    <motion.div className="flex justify-end mb-1 md:w-8/12 md:h-40 lg:h-96 lg:w-6/12 bg-transparent" initial={{ opacity: 0 }} animate={{
                        opacity: 1,
                        transition: { delay: 0.5, duration: 0.2, ease: 'easeInOut' }
                    }}>
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full h-full"
                            alt="Phone image" />
                    </motion.div>
                    <div className="md:w-8/12 sm:w-8/12 lg:ms-6 lg:w-5/12">
                        <div className="max-w-2xl max-h-2xl h-full w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
    );
}