import { useState } from 'react'
import {ClerkProvider} from "@clerk/clerk-react";
import {Routes, Route} from "react-router-dom";
import {Layout} from "./layout/Layout.jsx";
import {ChallengeGenerator} from "./challenge/ChallengeGenrator.jsx";
import {HistoryPanel} from "./history/HistoryPanel.jsx";
import {AuthenticationPage} from "./auth/AuthenticationPage.jsx";
import './App.css'
import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx";

function App() {
    return <ClerkProviderWithRoutes>
        <Routes>
            <Route path="/sign-in*" element={<AuthenticationPage/>}></Route>
            <Route path="/sign-up" element={<AuthenticationPage/>}></Route>
            <Route element={<Layout/>}>
                <Route path="/" element={<ChallengeGenerator/>}></Route>
                <Route path="history" element={<HistoryPanel/>}></Route>
            </Route>
        </Routes>
    </ClerkProviderWithRoutes>
}
export default App
