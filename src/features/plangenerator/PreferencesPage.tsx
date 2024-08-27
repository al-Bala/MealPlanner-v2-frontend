import "../../assets/css/plangenerator/PrefPage.css"
import {PrefsProvider} from "../../context/PreferencesContext.tsx";
import {Preferences} from "./Preferences.tsx";
import {MealsProvider} from "../../context/MealsContext.tsx";

export const PreferencesPage = () => {
    return (
        <>
            <PrefsProvider>
                <MealsProvider>
                    <Preferences/>
                </MealsProvider>
            </PrefsProvider>
        </>
    );
}