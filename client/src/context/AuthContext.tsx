import { createContext, useState, useContext, useEffect } from "react";
import { useAuthStore } from "../store/auth/auth";
export const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth no existe en AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }: any) => {

    const { user } = useAuthStore()

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </ AuthContext.Provider >
    )
}