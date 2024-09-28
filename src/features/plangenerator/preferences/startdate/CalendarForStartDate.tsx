import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {useContext} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

export default function CalendarForStartDate() {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                <DemoItem>
                    <div>
                        <DateCalendar
                            disablePast={true}
                            views={['day']}
                            value={state?.startDay}
                            onChange={(newValue) =>
                                dispatch?.({
                                    type: 'SET_START_DAY',
                                    startDay: newValue
                                })
                            }
                        />
                    </div>
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
