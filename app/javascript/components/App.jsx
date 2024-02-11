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
import Home, {Login, Register} from "./Home"


function App() {
    const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN')
    const [user, setUser] = useState({})

    const handleSuccessfulAuth = (data) => {
        handleLogin(data.user)
    }

    const handleLogin = (data) => {
        setLoggedInStatus('LOGGED_IN')
        setUser(data)
    }

    const handleLogout = () => {
        setLoggedInStatus("NOT_LOGGED_IN")
        setUser({})
    }

    const checkLoginStatus = () => {
        axios.get('http://127.0.0.1:9000/logged_in', {
            withCredentials: true
        }).then(response => {
            if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
                setLoggedInStatus('LOGGED_IN')
                setUser(response.data.user)
            } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
                setLoggedInStatus('NOT_LOGGED_IN')
                setUser({})
            }
        }).catch(error => {
            console.log("check login error", error)
        })
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<Home handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} handleSuccessfulAuth={handleSuccessfulAuth} />} />
                    <Route path='/login' element={<Login handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} handleSuccessfulAuth={handleSuccessfulAuth}/>} />
                    <Route path="/places" element={loggedInStatus && <PlacesList />} />
                    <Route path="/new-internet-speed" element={<NewInternetSpeed />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)