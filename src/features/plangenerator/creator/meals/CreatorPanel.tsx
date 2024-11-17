import {MealModel, mealsNames} from "../../../../models/models.ts";
import {OneMealOption} from "./OneMealOption.tsx";
import {Dispatch, SetStateAction} from "react";
import {t} from "i18next";
import {ResultDay} from "../../../../models/generatorModels.ts";
import {OneRecipeResult} from "../OneRecipeResult.tsx";

interface Props {
    currentDayIndex: number;
    repeatedDayIndex: number;
    setRepeatedDayIndex: Dispatch<SetStateAction<number>>;
    isMealButtonsChanged: boolean;
    dayResult: ResultDay | null;
}
export const CreatorPanel = ({currentDayIndex, repeatedDayIndex, setRepeatedDayIndex, isMealButtonsChanged, dayResult}: Props) => {
    return (
        <>
            <p>{t('chooseMealsMsg')}</p>
                <div className="inner-items-flex-con">
                    {mealsNames.map((meal: MealModel) => (
                        <div className="panel">
                            <OneMealOption key={meal.id}
                                           currentDayIndex={currentDayIndex}
                                           repeatedDayIndex={repeatedDayIndex}
                                           setRepeatedDayIndex={setRepeatedDayIndex}
                                           meal={meal}
                            >
                                {meal.typeName}
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