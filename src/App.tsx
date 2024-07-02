import './App.css'
import {PreferencesPage} from "./pages/PreferencesPage/PreferencesPage.tsx";
import {useTranslation} from "react-i18next";

function App() {

    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

  return (
      <>
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('pl')}>PL</button>
          <PreferencesPage/>
      </>
  )
}

export default App