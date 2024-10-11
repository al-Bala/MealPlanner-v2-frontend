import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";
import {useContext, useEffect} from "react";
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

export const Diet = ({ savedDietId }: { savedDietId: string | null }) =>  {
    const dispatch = useContext(PrefsDispatchContext);

    useEffect(() => {
        if(savedDietId !== null){
            dispatch?.({
                type: 'SET_DIET',
                dietId: savedDietId
            })
        }
    }, [savedDietId]);

    return (
        // <div className="pref-section" style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
        <div className="pref-section">
            <div>{t('dietMessage')}:</div>
            <DietOption/>
        </div>
    );
}