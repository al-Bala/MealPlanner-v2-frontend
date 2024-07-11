import {ReactNode, useContext, useState} from "react";
import {MealModel} from "../../../models/models.ts";
import TimeSlider from "./TimeSlider.tsx";
import {LuClock4} from "react-icons/lu";
import {DaysButton, FirstDayButton} from './Meals.style.ts';
import './Meals.css'
import {MealsContext, MealsDispatchContext} from "./MealsContext.tsx";

interface Props {
    meal: MealModel;
    children: ReactNode;
}

export const MealChooser = ({meal, children}: Props) => {
    const state = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);

    const [timeButton, setTimeButton] = useState(false);
    const [daysButton, setDaysButton] = useState(1);

    const isMealSelected = () => {
        return !!state?.find((s) => s.mealId == meal.id);
    }

    const handleMealClick = () => {
        if(isMealSelected()){
            dispatch?.({
                type: 'DELETE_MEAL',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
            setTimeButton(false)
        } else {
            dispatch?.({
                type: 'ADD_MEAL',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
        }
    }

    const handleDaysClick = (value: number) => {
        dispatch?.({
            type: 'SET_DAYS',
            meal: {mealId: meal.id, timeMin: -1, forHowManyDays: value}
        })
        if(daysButton != value){
            setDaysButton(value)
        }
    }

    const handleTimeClick = () => {
        timeButton ? setTime(-1) : setTime(15);
        setTimeButton(!timeButton);
    }

    function setTime(timeValue: number) {
        dispatch?.({
            type: 'SET_TIME',
            meal: {mealId: meal.id, timeMin: timeValue, forHowManyDays: 1}
        })
    }

    return (
        <div>
            <div>
                <FirstDayButton $selected={isMealSelected()} onClick={handleMealClick}>
                    {children}
                </FirstDayButton>
                {isMealSelected() &&
                    <FirstDayButton $selected={timeButton} disabled={!isMealSelected()} onClick={handleTimeClick}><LuClock4/></FirstDayButton>
                }
            </div>

            <div style={{height: "130px"}}>
                {isMealSelected() &&
                    <>
                        {meal.days &&
                            <div>
                                For how many days:
                                <DaysButton $selected={daysButton == 1} onClick={() => handleDaysClick(1)}>1</DaysButton>
                                <DaysButton $selected={daysButton == 2} onClick={() => handleDaysClick(2)}>2</DaysButton>
                            </div>
                        }
                    </>
                }
                {timeButton &&
                    <div style={{justifyItems:"center"}}>
                        <TimeSlider meal={meal}/>
                    </div>
                }
            </div>
        </div>
    );
}