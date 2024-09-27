import {useContext} from "react";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";

export const Date = ({dayIndex}: {dayIndex: number}) => {
    const statePrefs = useContext(PrefsContext);

    //TODO: problem z dalczymi dniami --> undefined
    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    return (
        <>
            <h2>{daysOfWeek[statePrefs.startDay?.day() + dayIndex] + ": " + statePrefs.startDay.add(dayIndex, 'days')?.format('DD.MM.YYYY')}</h2>
        </>
    );
}