import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {MealModel, MealValues} from "../../../models/models.ts";
import TimeSlider from "./TimeSlider.tsx";
import { LuClock4 } from "react-icons/lu";
import {FirstDayButton, DaysButton} from './FirstDay.style.ts';
import './FirstDay.css'

interface Props {
    meal: MealModel;
    mealValues: MealValues[];
    setMealValues: Dispatch<SetStateAction<MealValues[]>>;
    children: ReactNode;
}

export const MealDiv = ({meal, mealValues, setMealValues, children}: Props) => {
    const [mealValue] = useState<MealValues>({mealId: meal.id, timeMin: -1, forHowManyDays: 1});
    const [isTimeButton, setIsTimeButton] = useState(false);
    const [daysButton, setDaysButton] = useState(1);

    const isSelected = (chosenMeal: MealModel): boolean => {
        return !!mealValues.find((s) => s.mealId == chosenMeal.id);
    }

    const handleMealClick = (chosenMeal: MealModel) => {
        if(isSelected(chosenMeal)){
            const updatedItems = mealValues.filter(item => item.mealId !== chosenMeal.id);
            setMealValues(updatedItems);
            setIsTimeButton(false)
        } else {
            setMealValues(prevState => [...prevState, mealValue]);
        }
    }

    const forDays = (value: number) => {
        setMealValues(prevState => prevState.map(item =>
            item.mealId === meal.id ? {...item, forHowManyDays: value} : item
        ));
        if(daysButton != value){
            setDaysButton(value)
        }
    }

    const timeButton = () => {
        isTimeButton ? extracted(-1) : extracted(15);
        setIsTimeButton(!isTimeButton);
    }

    function extracted(timeValue: number) {
        setMealValues(prevState => prevState.map(item =>
            item.mealId === meal.id ? {...item, timeMin: timeValue} : item
        ));
    }

    return (
        <div>
            <div>
                <FirstDayButton $selected={isSelected(meal)} onClick={() => handleMealClick(meal)}>
                    {children}
                </FirstDayButton>
                {isSelected(meal) &&
                    <FirstDayButton $selected={isTimeButton} disabled={!isSelected(meal)} onClick={timeButton}><LuClock4/></FirstDayButton>
                }
            </div>

            <div style={{height: "130px"}}>
                {isSelected(meal) &&
                    <>
                        {meal.days &&
                            <div>
                                For how many days:
                                <DaysButton $selected={daysButton == 1} onClick={() => forDays(1)}>1</DaysButton>
                                <DaysButton $selected={daysButton == 2} onClick={() => forDays(2)}>2</DaysButton>
                            </div>
                        }
                    </>
                }
                {isTimeButton &&
                    <div style={{justifyItems:"center"}}>
                        <TimeSlider meal={meal} setTime={setMealValues}/>
                    </div>
                }
            </div>
        </div>
    );
}