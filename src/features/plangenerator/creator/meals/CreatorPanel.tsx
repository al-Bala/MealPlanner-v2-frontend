import {MealModel, mealsNames} from "../../../../models/models.ts";
import {OneMealOption} from "./OneMealOption.tsx";
import {Dispatch, SetStateAction} from "react";
import {t} from "i18next";
import {DayResult} from "../../../../models/generatorModels.ts";
import {OneRecipeResult} from "../OneRecipeResult.tsx";

interface Props {
    dayIndex: number;
    isTwoDays: number;
    setIsTwoDays: Dispatch<SetStateAction<number>>;
    isMealButtonsChanged: boolean;
    dayResult: DayResult | null;
}
export const CreatorPanel = ({dayIndex, isTwoDays, setIsTwoDays, isMealButtonsChanged, dayResult}: Props) => {
    return (
        <>
            <p>{t('chooseMealsMsg')}</p>
                <div className="inner-items-flex-con">
                    {mealsNames.map((meal: MealModel) => (
                        <div className="panel">
                            <OneMealOption key={meal.id}
                                           dayIndex={dayIndex}
                                           isTwoDays={isTwoDays}
                                           setIsTwoDays={setIsTwoDays}
                                           meal={meal}
                            >
                                {meal.name}
                            </OneMealOption>
                            {!isMealButtonsChanged &&
                                <OneRecipeResult meal={meal} dayResult={dayResult}/>
                            }
                        </div>
                    ))}
                </div>
        </>
    );
}