import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom"
import ReactDOM from 'react-dom/client'

import NewInternetSpeed from "./NewInternetSpeed"
import PlacesList from "./PlacesList"

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="*" element={<PlacesList />} />
                    <Route path="/new-internet-speed" element={<NewInternetSpeed />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<App />)