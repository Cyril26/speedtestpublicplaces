import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom"
import ReactDOM from 'react-dom/client'

import NewInternetSpeed from "./NewInternetSpeed"
import PlacesList from "./PlacesList"
import {Login, Register} from "./Home"
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from './AuthProvider';


function App() {

    return (
        <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/places" element={<PlacesList  />} />
                            <Route path="/new-internet-speed" element={ <NewInternetSpeed />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);