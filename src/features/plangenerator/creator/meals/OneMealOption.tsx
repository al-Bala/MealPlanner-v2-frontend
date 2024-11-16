import {Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {MealModel} from "../../../../models/models.ts";
import {RepeatRecipeButton, MealButton, FirstDayMealButton, TimeButton} from './Meals.style.ts';
import {MealsContext, MealsDispatchContext} from "../../../../context/MealsContext.tsx";
import TimeSlider from "./TimeSlider.tsx";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {t} from "i18next";

interface Props {
    currentDayIndex: number;
    repeatedDayIndex: number;
    setRepeatedDayIndex: Dispatch<SetStateAction<number>>;
    meal: MealModel;
    children: ReactNode;
}

export const OneMealOption = ({currentDayIndex, repeatedDayIndex, setRepeatedDayIndex, meal, children}: Props) => {
    const stateMeals = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);
    const [timeButton, setTimeButton] = useState(false);
    const [isRepeatRecipeClicked, setIsRepeatRecipeClicked] = useState(false);

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

    const handleRepeatRecipeClick = () => {
        if(isRepeatRecipeClicked){
            dispatch?.({
                type: 'SET_DAYS',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 1}
            })
            setRepeatedDayIndex(-1)
        } else {
            dispatch?.({
                type: 'SET_DAYS',
                meal: {mealId: meal.id, timeMin: -1, forHowManyDays: 2}
            })
            setRepeatedDayIndex(currentDayIndex + 1);
        }
        setIsRepeatRecipeClicked(!isRepeatRecipeClicked);
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
            <RepeatRecipeButton
                $selected={stateMeals.find(m => m.mealId == meal.id)?.forHowManyDays === 1}
                onClick={handleRepeatRecipeClick}
            >
                {t('repeatOption')}
            </RepeatRecipeButton>
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
                {currentDayIndex == 0 ?
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
            {isMealSelected() && meal.isRepeatable && renderRepeatMealButton()}
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
                {(currentDayIndex === repeatedDayIndex && meal.isRepeatable) ? renderRepeatedMealOption() : renderMealOption()}
            </div>
        </div>
    );
}