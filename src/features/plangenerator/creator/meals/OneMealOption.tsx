import {Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {MealModel} from "../../../../models/models.ts";
// import {LuClock4} from "react-icons/lu";
import {DaysButton, MealButton, FirstDayMealButton, TimeButton} from './Meals.style.ts';
import {MealsContext, MealsDispatchContext} from "../../../../context/MealsContext.tsx";
import TimeSlider from "./TimeSlider.tsx";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {t} from "i18next";

interface Props {
    dayIndex: number;
    isTwoDays: number;
    setIsTwoDays: Dispatch<SetStateAction<number>>;
    meal: MealModel;
    children: ReactNode;
}

export const OneMealOption = ({dayIndex, isTwoDays, setIsTwoDays, meal, children}: Props) => {
    const stateMeals = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);
    const [timeButton, setTimeButton] = useState(false);
    const [isRepeatButtonClicked, setIsRepeatButtonClicked] = useState(false);

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

    const handleDaysClick = () => {
        if(isRepeatButtonClicked){
            dispatch?.({
                type: 'SET_DAYS',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
            setIsTwoDays(-1)
        } else {
            dispatch?.({
                type: 'SET_DAYS',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 2}
            })
            setIsTwoDays(dayIndex + 1);
        }
        setIsRepeatButtonClicked(!isRepeatButtonClicked);
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

    const renderRepeatMealButton = () => (
        <div className="meal-repeat-button">
            <DaysButton
                $selected={isRepeatButtonClicked}
                onClick={handleDaysClick}
            >
                {t('repeatOption')}
            </DaysButton>
        </div>
    );

    const renderTimeButton = () => (
        <TimeButton
            $selected={timeButton}
            // disabled={!isMealSelected()}
            onClick={handleTimeClick}
        >
            <AccessTimeIcon/>
        </TimeButton>
    );

    const renderMealOption = () => (
        <>
            <div className="meal-name">
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
            </div>
            {isMealSelected() && meal.days && renderRepeatMealButton()}
            {timeButton && (
                <div>
                    <TimeSlider meal={meal}/>
                </div>
            )}
        </>
    );

    const renderRepeatedMealOption = () => (
        <>
            <button style={{background: "#386641", color: "white"}} disabled>
                {children}
            </button>
            <p>*({t('sameDinnerMsg')})</p>
        </>
    );

    return (
        <div className="meal-item">
            <div className="meal-box">
                {(dayIndex === isTwoDays && meal.days) ? renderRepeatedMealOption() : renderMealOption()}
            </div>
        </div>
    );
}