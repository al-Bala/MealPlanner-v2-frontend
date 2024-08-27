import {Outlet} from "react-router-dom"
import Navbar from "../../../components/Navbar.tsx";

const Layout = () => {
    return (
        <main className="App">
            <Navbar/>
            <Outlet />
        </main>
    )
}

export default Layout