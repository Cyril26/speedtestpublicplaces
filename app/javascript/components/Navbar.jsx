import React from 'react'
import axios from "axios"
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const handleLogoutClick = () => {
        axios.delete("http://127.0.0.1:9000/logout", {
            withCredentials: true
        }).then(() => {
            handleLogout()
            navigate("/")
        }).catch(error => console.log("logout error", error))
    }

    return (
        <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
            <a href="#" className="p-2 mr-4 inline-flex items-center">
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-white h-8 w-8 mr-2"
                >
                    <path
                        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
                    />
                </svg>
                <span className="text-xl text-white font-bold uppercase tracking-wide"
                >Public Places</span>
            </a>
            {
                user &&
                    <button
                        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
                        data-target="#navigation"
                        onClick={() => handleLogoutClick()}
                    >
                        Logout
                    </button>
            }
            <div
                className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
                id="navigation"
            >
                <div
                    className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
                >
                    <div
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        {user && <button onClick={() => handleLogoutClick()}>Logout</button>}
                    </div>
                </div>
            </div>
        </nav>

    )
}
