import {t} from "i18next";
import {useContext, useEffect} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

export const Portions = ({savedPortions}: {savedPortions: number | null}) =>  {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    useEffect(() => {
        if(savedPortions !== null){
            dispatch?.({
                type: 'SET_PORTIONS_NR',
                portionsNr: savedPortions || undefined,
            })
        }
    }, [savedPortions]);

    return (
        <div className="prefs-item portion-section">
            <div className="header-box">
                <p>{t('portionsMessage')}</p>
            </div>
            <div className="portion-box">
                <input
                    type="number"
                    value={state?.portionsNr != null ? state?.portionsNr : ''}
                    placeholder={t('portionsMessage')}
                    onChange={(e) =>
                        dispatch?.({
                            type: 'SET_PORTIONS_NR',
                            portionsNr: Number(e.target.value)
                        })
                    }
                />
            </div>
        </div>
    );
}