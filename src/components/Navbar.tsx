import {Link} from 'react-router-dom';
import './Navbar.css';
import i18n from "i18next";
import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useApiAuth} from "../api/apiAuth.ts";

const Navbar = () => {
    const {auth} = useAuth();
    const {logout} = useApiAuth();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                {auth.username ?
                    <>
                        <li className="navbar-item">
                            <Link to="/" onClick={(e) => {
                                e.preventDefault();
                                logout('');
                            }}>
                                Sign out
                            </Link>
                        </li>
                    </> :
                    <>
                        <li className="navbar-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                }
                <li className="navbar-item">
                    <button onClick={() => changeLanguage('en')}>EN</button>
                </li>
                <li className="navbar-item">
                    <button onClick={() => changeLanguage('pl')}>PL</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
