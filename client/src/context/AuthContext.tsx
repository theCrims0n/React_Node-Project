import { createContext, useState, useContext, useEffect } from "react";
import { useAuthStore } from "../store/auth/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth no existe en AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: any) => {

    const { user, verify } = useAuthStore()
    const navigate = useNavigate()
    const token = Cookies.get('token')

    useEffect(() => {
        verify()
    }, [navigate, token])

    return (
        <AuthContext.Provider key={token} value={{ user }}>
            {children}
        </ AuthContext.Provider >
    )
}