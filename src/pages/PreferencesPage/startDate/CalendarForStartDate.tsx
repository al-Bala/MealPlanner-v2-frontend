import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {Dispatch, SetStateAction} from "react";

interface Props {
    firstDay: dayjs.Dayjs
    setFirstDay: Dispatch<SetStateAction<dayjs.Dayjs>>
}

export default function CalendarForStartDate({firstDay, setFirstDay}: Props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                <DemoItem>
                    <div>
                        <DateCalendar
                            disablePast={true}
                            views={['day']}
                            value={firstDay}
                            onChange={(newValue) => setFirstDay(newValue)}
                        />
                    </div>
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
