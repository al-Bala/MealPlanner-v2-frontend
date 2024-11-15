import {TempRecipe} from "../../../models/generatorModels.ts";

interface Props{
    day: TempRecipe[] | undefined
}

export const PlannedRecipes = ({day}: Props) => {
    return (
        <div className="inner-items-flex-con">
            {day?.sort((a, b) => a.typeOfMeal.localeCompare(b.typeOfMeal))
                .map(r => (
                    <div className={r.recipeId === 'SKIPPED' ? 'panel empty-recipe' : 'panel set-recipe'}>
                        <div className="meal-type">{r.typeOfMeal}</div>
                        <div className={r.isRepeated ? 'recipe-item repeated' : 'recipe-item'} key={r.typeOfMeal}>
                            <div className="recipe-box">
                                <div className="photo-box"></div>
                                <div className="recipe-name">
                                    <p>{r.recipeName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="planned-background-mobile"></div>
                    </div>
                ))}
        </div>
    );
}