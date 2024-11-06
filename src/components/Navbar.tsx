import {Link} from 'react-router-dom';
import '../assets/css/Navbar.css';
import i18n, {t} from "i18next";
import useAuth from "../features/authentication/hooks/useAuth.ts";
import {useApiAuth} from "../api/useApiAuth.ts";
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";

const Navbar = () => {
    const {auth} = useAuth();
    const {logout} = useApiAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [checkLang, setCheckLang] = useState('en');

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setCheckLang(lng);
    };

    return (
        <nav className={menuOpen ? "open" : ""}>
            <div className="logo">
                <Link to="/">MealPlanner</Link>
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <MenuIcon/>
            </div>
            <ul>
                <li className="home">
                    <Link
                        onClick={() => setMenuOpen(!menuOpen)}
                        to="/">{t('home')}
                    </Link>
                </li>
                <li className="generator">
                    <Link
                        onClick={() => setMenuOpen(!menuOpen)}
                        to="/generator">{t('generator')}
                    </Link>
                </li>
                {auth.username ?
                    <>
                        <li>
                            <Link
                                onClick={() => setMenuOpen(!menuOpen)}
                                to="/profile">{t('profile')}
                            </Link>
                        </li>
                        <li className="sign-in-out">
                            <Link
                                onClick={() => {
                                    logout('');
                                    setMenuOpen(!menuOpen)
                                }}
                                to="/">{t('signOut')}
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="sign-in-out">
                            <Link
                                onClick={() => setMenuOpen(!menuOpen)}
                                to="/login">{t('logIn')}
                            </Link>
                        </li>
                    </>
                }
                <li className="lang">
                    <LanguageIcon/>
                    <select onChange={(e) => changeLanguage(e.target.value)}>
                        <option value="en">ENG</option>
                        <option value="pl">PL</option>
                    </select>
                    <button className={checkLang === 'en' ? "checked-lang" : ""}
                            onClick={() => changeLanguage('en')}>ENG
                    </button>
                    <button className={checkLang === 'pl' ? "checked-lang" : ""}
                            onClick={() => changeLanguage('pl')}>PL
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
