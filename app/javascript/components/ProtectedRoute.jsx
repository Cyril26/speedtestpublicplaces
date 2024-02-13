import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ loginStatus }) => {
    const navigate = useNavigate()

    console.log(loginStatus)

    useEffect(() => {
        if (!loginStatus)
            navigate("/")
    }, [loginStatus])


    return (
        <Outlet />
    )
}
