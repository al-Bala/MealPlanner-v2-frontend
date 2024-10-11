import {Link} from 'react-router-dom';
import '../assets/css/Navbar.css';
import i18n, {t} from "i18next";
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
            <ul>
                <li style={{float: "left"}}>
                    <Link to="/">MealPlanner</Link>
                </li>
                <li>
                    <button className="lang-button" onClick={() => changeLanguage('en')}>EN</button>
                    <button className="lang-button" onClick={() => changeLanguage('pl')}>PL</button>
                </li>
                {auth.userId ?
                    <>
                        <li>
                            <Link to="/" onClick={(e) => {
                                e.preventDefault();
                                logout('');
                            }}>
                                {t('signOut')}
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">{t('profile')}</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/register">{t('signUp')}</Link>
                        </li>
                        <li>
                            <Link to="/login">{t('logIn')}</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
};

export default Navbar;
