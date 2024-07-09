import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {useState} from "react";

// const Input = styled(MuiInput)`
//   width: 100px;
// `;

const marks = [
    {
        value: 15,
        label: '15',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 30,
        label: '30',
    },
    {
        value: 60,
        label: '1h',
    },
    {
        value: 120,
        label: '2h',
    },
];

export default function InputSlider() {
    const [value, setValue] = useState(30);
    const [isMin, setIsMin] = useState(true);
    const[hour, setHour] = useState(0);
    const[min, setMin] = useState(0);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const nrValue = Number(newValue);
        // setValue(newValue as number);
        setValue(nrValue);
        if(nrValue >= 60){
            setIsMin(false)
        } else {
            setIsMin(true)
        }

        const hour1 = Math.floor(nrValue/60);
        const min1 = nrValue - hour1 * 60;
        setHour(hour1);
        setMin(min1);
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = event.target.value === '' ? 0 : Number(event.target.value);
    //     setValue(inputValue >= 60 ? inputValue / 60 : inputValue);
    // };

    // const handleBlur = () => {
    //     if (value < 0) {
    //         setValue(0);
    //     } else if (value > 120) {
    //         setValue(120);
    //     }
    // };

    const timeString = () => {
        // const hour = Math.floor(value/60);
        // const min = value - hour * 60;
        // return hour + " h " + min + "min";
    };

    function valueLabelFormat(value: number) {
        const units = ['KB', 'MB', 'GB', 'TB'];

        let unitIndex = 0;
        let scaledValue = value;

        while (scaledValue >= 1024 && unitIndex < units.length - 1) {
            unitIndex += 1;
            scaledValue /= 1024;
        }

        return `${scaledValue} ${units[unitIndex]}`;
    }

    function calculateValue(value: number) {
        return 2 ** value;
    }

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                Time
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        defaultValue={30}
                        step={5}
                        min={15}
                        max={120}
                        marks={marks}
                        scale={calculateValue}
                        getAriaValueText={valueLabelFormat}
                        valueLabelFormat={valueLabelFormat}
                    />
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            <div>
                {/*{value}---{hour}---{min}---*/}
                {isMin &&
                    <>
                        {value} min
                    </>
                }
                {!isMin &&
                    <>
                        {/*{Math.floor(value/60)} h {value - 60} min*/}
                        {hour} h {min !== 0 ? (min + " min") : ''}
                    </>
                }

            </div>
            {/*<Input*/}
            {/*    value={value >= 60 ? value * 0.0166666666666667 : value}*/}
            {/*    size="small"*/}
            {/*    onChange={handleInputChange}*/}
            {/*    onBlur={handleBlur}*/}
            {/*    inputProps={{*/}
            {/*        step: 5,*/}
            {/*        min: 15,*/}
            {/*        max: 120,*/}
            {/*        type: 'number',*/}
            {/*        'aria-labelledby': 'input-slider',*/}
            {/*    }}*/}
            {/*/>*/}
        </Box>
    );
}
