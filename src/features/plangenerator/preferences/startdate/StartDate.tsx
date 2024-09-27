import {t} from "i18next";
import CalendarForStartDate from "./CalendarForStartDate.tsx";

export const StartDate = () => {
    return (
        <div className="item-calendar" style={{ backgroundColor: 'lightblue'}}>
            <div>{t('firstDayMessage')}:</div>
            <CalendarForStartDate/>
        </div>
    );
}