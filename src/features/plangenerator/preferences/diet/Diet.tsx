import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";
import {DietModel} from "../../../../models/models.ts";
import {useContext, useEffect} from "react";
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

export const Diet = ({savedDiet}: {savedDiet: DietModel | null}) =>  {
    const dispatch = useContext(PrefsDispatchContext);

    useEffect(() => {
        if(savedDiet !== null){
            dispatch?.({
                type: 'SET_DIET',
                diet: savedDiet,
            })
        }
    }, [savedDiet]);

    return (
        <div style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
            <div>{t('dietMessage')}:</div>
            <DietOption/>
        </div>
    );
}