import {t} from "i18next";
import dayjs from "dayjs";
import {Dispatch, SetStateAction} from "react";
import CalendarForStartDate from "./CalendarForStartDate.tsx";

interface Props{
    firstDay: dayjs.Dayjs;
    setFirstDay: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

export const StartDate = ({firstDay, setFirstDay}: Props) => {
    return (
        <div className="item-calendar" style={{ backgroundColor: 'lightblue'}}>
            <div>{t('firstDayMessage')}:</div>
            <CalendarForStartDate firstDay={firstDay} setFirstDay={setFirstDay}/>
        </div>
    );
}