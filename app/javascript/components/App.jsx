import React, { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import axios from "axios"

import NewInternetSpeed from "./NewInternetSpeed"
import PlacesList from "./PlacesList"
import {Login, Register} from "./Home"
import Navbar from './Navbar';
import { ProtectedRoute } from './ProtectedRoute';


function App() {
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
            if (response.status == 200) {
                setUser(response.data)
                setLoginStatus(true)
            }
        }).catch(error => {
            console.log("check login error", error)
        })
    }

    useEffect(() => {
        checkLoginStatus()
    }, [loginStatus])


    return (
        <>
        <Navbar user={user} handleLogout={handleLogout}/>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<Login handleLogin={handleLogin} handleLogout={handleLogout} />} />
                    <Route path='/register' element={<Register handleLogin={handleLogin} handleLogout={handleLogout} />} />
                    <Route element={<ProtectedRoute loginStatus={loginStatus}/>}>
                        <Route path="/places" element={user && <PlacesList user={user} />} />
                        <Route path="/new-internet-speed" element={user && <NewInternetSpeed />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)