import {t} from "i18next";
import CalendarForStartDate from "./CalendarForStartDate.tsx";

export const StartDate = () => {
    return (
        <div className="calendar-item">
            <div  className="pref-section">
                <div>{t('firstDayMessage')}:</div>
                <CalendarForStartDate/>
            </div>
        </div>
    );
}