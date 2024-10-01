import {Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {MealModel} from "../../../../models/models.ts";
import {LuClock4} from "react-icons/lu";
import {DaysButton, MealButton, FirstDayMealButton, TimeButton} from './Meals.style.ts';
import '../../../../assets/css/plangenerator/Meals.css'
import {MealsContext, MealsDispatchContext} from "../../../../context/MealsContext.tsx";
import TimeSlider from "./TimeSlider.tsx";

interface Props {
    dayIndex: number;
    isTwoDays: number;
    setIsTwoDays: Dispatch<SetStateAction<number>>;
    meal: MealModel;
    children: ReactNode;
}

export const MealOption = ({dayIndex, isTwoDays, setIsTwoDays, meal, children}: Props) => {
    const stateMeals = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);
    const [timeButton, setTimeButton] = useState(false);

    const isMealSelected = () => {
        return !!stateMeals.find((selectedMeal) => selectedMeal.mealId == meal.id);
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
        if(value == 2){
            setIsTwoDays(dayIndex + 1);
        } else {
            setIsTwoDays(-1)
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

    const renderDaysButtons = () => (
        <div>
            For how many days:
            <DaysButton
                $selected={stateMeals.find(m => m.mealId == meal.id)?.forHowManyDays === 1}
                onClick={() => handleDaysClick(1)}
            >
                1
            </DaysButton>
            <DaysButton
                $selected={stateMeals.find(m => m.mealId == meal.id)?.forHowManyDays === 2}
                onClick={() => handleDaysClick(2)}
            >
                2
            </DaysButton>
        </div>
    );

    const renderTimeButton = () => (
        <TimeButton
            $selected={timeButton}
            // disabled={!isMealSelected()}
            onClick={handleTimeClick}
        >
            <LuClock4 />
        </TimeButton>
    );

    const renderMealOption = () => (
        <>
            {dayIndex == 0 ?
                <FirstDayMealButton
                    disabled={meal.name === 'Dinner'}
                    $mealName={meal.name}
                    $selected={isMealSelected()}
                    onClick={handleMealClick}
                >
                    {children}
                </FirstDayMealButton>
                :
                <MealButton
                    $selected={isMealSelected()}
                    onClick={handleMealClick}
                >
                    {children}
                </MealButton>

            }
            {isMealSelected() && renderTimeButton()}
            {isMealSelected() && meal.days && renderDaysButtons()}
            <div>
                {timeButton && (
                    <div style={{justifyItems: "center"}}>
                        <TimeSlider meal={meal}/>
                    </div>
                )}
            </div>
        </>
    );

    const renderRepeatedMealOption = () => (
        <>
            <button style={{background: "blue", color: "lightgrey"}} disabled>
                {children}
            </button>
            <p>*( To samo co wczoraj )</p>
        </>
    );

    return (
        <div>
            {(dayIndex === isTwoDays && meal.days) ? renderRepeatedMealOption() : renderMealOption()}
        </div>
    );
}