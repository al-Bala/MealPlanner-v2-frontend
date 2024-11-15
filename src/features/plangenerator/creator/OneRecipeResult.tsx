import {MealModel} from "../../../models/models.ts";
import {DayResult} from "../../../models/generatorModels.ts";

interface Props{
    meal: MealModel;
    dayResult: DayResult | null;
}

export const OneRecipeResult = ({meal, dayResult}: Props) => {

    const findMeal = (mealId: string) => {
        return dayResult?.recipesResult
            .find(meal => meal.typeOfMeal === mealId);
    }
    const mealForDay = findMeal(meal.name);

    return (
        <div className={mealForDay?.recipeId === 'SKIPPED' ? 'recipe-item empty-recipe' : 'recipe-item set-recipe'}>
            <div className="recipe-box">
                <div className="photo-box"></div>
                <div className="recipe-name">
                    <p>{mealForDay?.recipeName}</p>
                </div>
            </div>
            <div className="results-background-mobile"></div>
        </div>
    );
}