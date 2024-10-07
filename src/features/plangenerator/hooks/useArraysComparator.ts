import {MealValues} from "../../../models/models.ts";
import {useContext} from "react";
import {MealsContext} from "../../../context/MealsContext.tsx";
import {DayResult, TempDay} from "../../../models/generatorModels.ts";

const areArraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
};

const useArraysComparator = () => {
    const stateMeals = useContext(MealsContext);

    const isMealButtonsChanged = ({currentMeals}: {currentMeals: MealValues[]}) => {
        const isMealsButtonsChanged = () => {
            if(currentMeals.length == 0 && stateMeals.length == 0) return false;
            return !isAllMealButtonsEqual;
        };

        const isAllMealButtonsEqual = areArraysEqual(
            currentMeals.flatMap(m => m.mealId),
            stateMeals.flatMap(m => m.mealId)
        );

        return isMealsButtonsChanged();
    }

    const isTempDaysAndResultEqual = ({tempDays, result}: {tempDays: TempDay[], result: DayResult}) => {
        return areArraysEqual(
            tempDays.length != 0 ? tempDays[tempDays.length - 1].tempRecipes.flatMap(d => d.recipeId) : [],
            result.recipesResult.length != 0 ? result.recipesResult.flatMap(d => d.recipeId) : []
        );
    }


    return {
        isMealButtonsChanged,
        isTempDaysAndResultEqual
    };
};

export default useArraysComparator;