import {Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {MealModel, PlannedDayGood} from "../../../models/models.ts";
import TimeSlider from "./TimeSlider.tsx";
import {LuClock4} from "react-icons/lu";
import {DaysButton, FirstDayButton, FirstDayButton1} from './Meals.style.ts';
import '../../../assets/css/plangenerator/Meals.css'
import {MealsDispatchContext} from "../../../context/MealsContext.tsx";
import dayjs from "dayjs";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";

interface Props {
    date:  dayjs.Dayjs;
    meal: MealModel;
    plannedDaysScreen: PlannedDayGood[]
    setPlannedDaysScreen: Dispatch<SetStateAction<PlannedDayGood[]>>
    children: ReactNode;
}

export const MealChooser = ({date, meal, plannedDaysScreen, setPlannedDaysScreen, children}: Props) => {

    const statePrefs = useContext(PrefsContext);
    const dispatch = useContext(MealsDispatchContext);

    const [timeButton, setTimeButton] = useState(false);
    const [daysButton, setDaysButton] = useState(1);

    const isMealSelected = () => {
        const plannedDayForDate = plannedDaysScreen?.find((p) => p.date == date);
        return !!plannedDayForDate?.mealsValues.find((s) => s.mealId == meal.id)
    }

    const handleMealClick = () => {
        if(isMealSelected()){
            dispatch?.({
                type: 'DELETE_MEAL',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
            setPlannedDaysScreen(
                plannedDaysScreen.map(p =>
                    p.date == date
                        ? {...p, mealsValues: p.mealsValues.filter(m => m.mealId !== meal.id)}
                        : p
                )
            );
            plannedDaysScreen.filter(m => m.date !== date);
            setTimeButton(false)
        } else {
            dispatch?.({
                type: 'ADD_MEAL',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
            setPlannedDaysScreen(
                plannedDaysScreen.map(m =>
                    m.date == date
                        ? {...m, mealsValues: [...m.mealsValues, {mealId: meal.id, timeMin: -1, forHowManyDays: 1}]}
                        : m
                )
            );
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
                {date == statePrefs.startDay &&
                    <FirstDayButton1 disabled={meal.name == 'Dinner'} $mealName={meal.name} $selected={isMealSelected()} onClick={handleMealClick}>
                        {children}
                    </FirstDayButton1>
                }
                {date !== statePrefs.startDay &&
                    <FirstDayButton $selected={isMealSelected()} onClick={handleMealClick}>
                        {children}
                    </FirstDayButton>
                }
                {isMealSelected() &&
                    <FirstDayButton $selected={timeButton} disabled={!isMealSelected()}
                                    onClick={handleTimeClick}><LuClock4/></FirstDayButton>
                }
            </div>
            <div>
                {isMealSelected() &&
                    <>
                        {meal.days &&
                            <div>
                                For how many days:
                                <DaysButton $selected={daysButton == 1}
                                            onClick={() => handleDaysClick(1)}>1</DaysButton>
                                <DaysButton $selected={daysButton == 2}
                                            onClick={() => handleDaysClick(2)}>2</DaysButton>
                            </div>
                        }
                    </>
                }
                {timeButton &&
                    <div style={{justifyItems: "center"}}>
                        <TimeSlider meal={meal}/>
                    </div>
                }
            </div>
        </div>
    );
}