import './assets/css/App.css'
// import {Route, Router, Routes} from "react-router-dom";
import {Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/HomePage.tsx";
import {useTranslation} from "react-i18next";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Layout from "./features/authentication/components/Layout.tsx";
import RequireAuth from "./features/authentication/components/RequireAuth.tsx";
import {PreferencesPage} from "./features/plangenerator/PreferencesPage.tsx";

function App() {

    const {i18n} = useTranslation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {/* public routes */}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/" element={<HomePage/>}/>

                    {/* protected routes */}
                    <Route element={<RequireAuth/>}>
                        <Route path="/generator" element={<PreferencesPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Route>
                </Route>
            </Routes>
            {/*<Router>*/}
            {/*    <Navbar token={token} setToken={setToken}/>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/" element={<HomePage/>}/>*/}
            {/*        <Route path="/generator" element={<PreferencesPage/>}/>*/}
            {/*        /!*<Route path="/login" element={<Login setToken={setToken}/>}/>*!/*/}
            {/*        <Route path="/login" element={<LoginPage/>}/>*/}
            {/*        <Route path="/register" element={<RegisterPage/>}/>*/}
            {/*        <Route path="/profile" element={<ProfilePage/>}/>*/}
            {/*    </Routes>*/}
            {/*</Router>*/}
        </>
    )
}

export default App