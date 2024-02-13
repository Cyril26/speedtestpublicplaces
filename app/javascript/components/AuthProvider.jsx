import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"


const AuthContext = createContext({
    user: null
})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loginStatus, setLoginStatus] = useState(false)

    const handleLogin = (data) => {
        setUser(data)
        if (data.status == "ok") {
            setLoginStatus(true)
        }
    }

    const handleLogout = () => {
        setUser(null)
        setLoginStatus(false)
    }

    const checkLoginStatus = () => {
        axios.get('http://127.0.0.1:9000/logged_in', {
            withCredentials: true
        }).then(response => {
            if (response.status === 200 && response.data) {
                setUser(response.data)
                setLoginStatus(true)
            }
        }).catch(error => {
            console.log("check login error", error)
        })
    }

    useEffect(() => {
        checkLoginStatus();
    }, [loginStatus]);

    return (
        <AuthContext.Provider value={{user, loginStatus, handleLogin, handleLogout, checkLoginStatus}}>
            {children}
        </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)