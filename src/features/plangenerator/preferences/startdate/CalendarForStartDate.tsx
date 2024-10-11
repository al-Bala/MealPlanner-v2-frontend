import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {useContext} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

export default function CalendarForStartDate() {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    // https://mui.com/material-ui/customization/how-to-customize/
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                <DemoItem>
                    <div>
                        <DateCalendar
                            // sx={{
                            //     '& .Mui-selected': {
                            //         background: '#2c4f33',
                            //         '&:hover': {
                            //             background: '#2c4f33'
                            //         },
                            //         '&:focus': {
                            //             background: '#2c4f33',
                            //         },
                            //         '&:active': {
                            //             background: '#2c4f33'
                            //         },
                            //     },
                            // }}
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
