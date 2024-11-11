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
        <div className="prefs-item diet-section">
            <div className="header-box">
                <p>{t('dietMessage')}</p>
            </div>
            <DietOption/>
        </div>
    );
}