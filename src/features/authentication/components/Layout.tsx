import {Outlet} from "react-router-dom"
import Navbar from "../../../components/Navbar.tsx";
import '../../../assets/css/index.css'

const Layout = () => {
    return (
        <main className="App">
            <Navbar/>
            <div className="background">
                <Outlet />
            </div>
        </main>
    )
}

export default Layout