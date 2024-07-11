import "./PrefPage.css"
import {PrefsProvider} from "./PreferencesContext.tsx";
import {Preferences} from "./Preferences.tsx";
import {MealsProvider} from "./meals/MealsContext.tsx";

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