import {MealModel} from "../../../../models/models.ts";
import {MealOption} from "./MealOption.tsx";
import {Date} from "../Date.tsx";
import {Dispatch, SetStateAction} from "react";
import {t} from "i18next";

interface Props {
    dayIndex: number;
    isTwoDays: number;
    setIsTwoDays: Dispatch<SetStateAction<number>>;
}

export const MealsChooser = ({dayIndex, isTwoDays, setIsTwoDays}: Props) => {
    const mealsNames: MealModel[] = [
        {id:'BREAKFAST', name:'Breakfast', days: false},
        // {id:'L', name:'Lunch', days: false},
        {id:'DINNER', name:'Dinner', days: true},
        {id:'SUPPER', name:'Supper', days: false}
    ];

    return (
        <div>
            <Date dayIndex={dayIndex}/>
            <p>{t('chooseMealsMsg')}</p>
            <div className="meals-box">
                <div className="recipes-flex-con">
                    {mealsNames.map((meal: MealModel) => (
                        <MealOption key={meal.id}
                                    dayIndex={dayIndex}
                                    isTwoDays={isTwoDays}
                                    setIsTwoDays={setIsTwoDays}
                                    meal={meal}
                        >
                            {meal.name}
                        </MealOption>
                    ))}
                </div>
            </div>
        </div>
    );
}