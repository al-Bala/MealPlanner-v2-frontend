import "../assets/css/plangenerator/PrefsPanel.css"
import "../assets/css/plangenerator/PrefsProducts.css"
import "../assets/css/plangenerator/creator/Base.css"
import "../assets/css/plangenerator/creator/Creator.css"
import "../assets/css/plangenerator/creator/CreatorMeals.css"
import "../assets/css/plangenerator/creator/CreatorResults.css"
import "../assets/css/plangenerator/creator/Planned.css"
import "../assets/css/plangenerator/creator/Recipe.css"
import {PrefsProvider} from "../context/PreferencesContext.tsx";
import {Preferences} from "../features/plangenerator/preferences/Preferences.tsx";
import {MealsProvider} from "../context/MealsContext.tsx";
import {useEffect, useState} from "react";
import {Creator} from "../features/plangenerator/creator/Creator.tsx";
import {PlannedDays} from "../features/plangenerator/creator/PlannedDays.tsx";
import {TempDay} from "../models/generatorModels.ts";

export const GeneratorPage = () => {
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [tempDays, setTempDays] = useState<TempDay[]>([]);

    useEffect(() => {
        if (isNextClicked) {
            document.getElementById('target')?.scrollIntoView({behavior: 'smooth'});
        }
    }, [isNextClicked]);

    return (
        <>
            <PrefsProvider>
                <MealsProvider>
                    <Preferences setIsNextClicked={setIsNextClicked}/>
                    {isNextClicked &&
                        <>
                            <PlannedDays tempDays={tempDays}/>
                            <Creator tempDays={tempDays} setTempDays={setTempDays}/>
                        </>
                    }
                </MealsProvider>
            </PrefsProvider>
        </>
    );
}