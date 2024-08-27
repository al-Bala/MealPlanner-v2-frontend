import {t} from "i18next";
import {useContext} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../context/PreferencesContext.tsx";
import dayjs from "dayjs";

export const Portions = () =>  {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    return (
        <div style={{ backgroundColor: 'lightblue', marginLeft: '0.5em'}}>
            <div>{t('portionsMessage')}:</div>
            <input
                type="number"
                value={state?.portionsNr}
                placeholder={t('portionsMessage')}
                onChange={(e) =>
                    dispatch?.({
                        type: 'SET_PORTIONS_NR',
                        diet: {id: 0, name: ''},
                        portionsNr: e.target.value,
                        productToAvoid: '',
                        userProduct: {name: '', amount: '', unit: ''},
                        startDay: dayjs(),
                        mealValues: []
                    })
                }
            />
        </div>
    );
}