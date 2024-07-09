import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import {Dispatch, SetStateAction, useState} from "react";
import {MealModel, MealValues} from "../../../models/models.ts";

interface Props {
    meal: MealModel;
    setTime: Dispatch<SetStateAction<MealValues[]>>
}

interface Time {
    timeString: string;
    timeMin: number;
}

const times: Time[] = [
    { timeString: "15min", timeMin: 15 },
    { timeString: "20min", timeMin: 20 },
    { timeString: "30min", timeMin: 30 },
    { timeString: "45min", timeMin: 45 },
    { timeString: "1h", timeMin: 60 },
    { timeString: "1h30min", timeMin: 90 },
    { timeString: "1h45min", timeMin: 105 },
    { timeString: "2h", timeMin: 120 }
];

function valueLabelFormat(value: number) {
    return times[value].timeString;
}

export default function TimeSlider({meal, setTime}: Props) {
    const [value, setValue] = useState<number>(0);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            const timeT: number = times[newValue].timeMin;
            setTime(prevState => prevState.map(item =>
                item.mealId === meal.id ? {...item, timeMin: timeT} : item
            ));
            setValue(newValue)
        }
    };

    return (
        <Box sx={{ width: 140 }} style={{margin: "auto"}}>
            <Typography id="time-slider" gutterBottom>
                Time: {valueLabelFormat(value)}
            </Typography>
            <Slider
                value={value}
                min={0}
                step={1}
                max={times.length - 1}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
                aria-labelledby="time-slider"
            />
        </Box>
    );
}
