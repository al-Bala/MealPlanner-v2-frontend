import {t} from "i18next";
import CalendarForStartDate from "./CalendarForStartDate.tsx";

export const StartDate = () => {
    return (
        <div className="prefs-item calendar-section">
            <div className="header-box">
                <p>{t('firstDayMessage')}:</p>
            </div>
            <CalendarForStartDate/>
        </div>
    );
}