import "../assets/css/plangenerator/PrefPage.css"
import {PrefsProvider} from "../context/PreferencesContext.tsx";
import {Preferences} from "../features/plangenerator/preferences/Preferences.tsx";
import {MealsProvider} from "../context/MealsContext.tsx";
import {useEffect, useState} from "react";
import {apiUser} from "../api/apiUser.ts";
import useAuth from "../features/authentication/hooks/useAuth.ts";
import {SavedPrefers} from "../models/models.ts";
import {PlanCreator} from "../features/plangenerator/creator/PlanCreator.tsx";

export const GeneratorPage = () => {
    const {auth} = useAuth();
    const [savedUserPrefers, setSavedUserPrefers] = useState<SavedPrefers>(
        {
            diet: null,
            portions: null,
            products_to_avoid: []
        });
    const [isNextClicked, setIsNextClicked] = useState(false);

    useEffect(() => {
        apiUser().getPrefers({userId: auth.userId})
            .then(prefs => {
                if(prefs){
                    setSavedUserPrefers({
                        diet: prefs.diet,
                        portions: prefs.portions,
                        products_to_avoid: prefs.products_to_avoid
                    });
                }
            });
    }, [])

    useEffect(() => {
        if (isNextClicked) {
            document.getElementById('target-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isNextClicked]);

    return (
        <>
            <PrefsProvider>
                <MealsProvider>
                    <Preferences
                        savedUserPrefers={savedUserPrefers}
                        setIsNextClicked={setIsNextClicked}
                    />
                    <div id="target">
                        {isNextClicked &&
                            <PlanCreator/>
                        }
                        <div style={{height: "600px"}}></div>
                    </div>
                </MealsProvider>
            </PrefsProvider>
        </>
    );
}