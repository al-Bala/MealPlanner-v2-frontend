import {useContext} from "react";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";

const countWeekdayIndex = (index: number) => {
    return index > 6 ? index - 7 : index;
};

export const Date = ({dayIndex}: {dayIndex: number}) => {
    const statePrefs = useContext(PrefsContext);
    const weekdayIndex = countWeekdayIndex(statePrefs.startDay?.day() + dayIndex);
    // const daysOfWeekPl = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const daysOfWeekEng = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <>
            <h2>{daysOfWeekEng[weekdayIndex] + ": " + statePrefs.startDay.add(dayIndex, 'days')?.format('DD.MM.YYYY')}</h2>
        </>
    );
}