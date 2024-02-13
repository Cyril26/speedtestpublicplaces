import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuth } from './AuthProvider'

export const ProtectedRoute = () => {
    const { loginStatus, checkLoginStatus } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const navigateIfNotLoggedIn = async () => {
            await checkLoginStatus();
            if (!loginStatus)
                navigate("/")
        }

        navigateIfNotLoggedIn();
    }, [])


    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
