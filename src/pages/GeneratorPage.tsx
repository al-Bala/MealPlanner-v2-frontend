import "../assets/css/plangenerator/PrefPage.css"
import {PrefsProvider} from "../context/PreferencesContext.tsx";
import {Preferences} from "../features/plangenerator/preferences/Preferences.tsx";
import {MealsProvider} from "../context/MealsContext.tsx";
import {useEffect, useState} from "react";
import {PlanCreator} from "../features/plangenerator/creator/PlanCreator.tsx";

export const GeneratorPage = () => {
    const [isNextClicked, setIsNextClicked] = useState(false);

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