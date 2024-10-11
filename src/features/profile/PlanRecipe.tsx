import {PlannedDay} from "../../models/generatorModels.ts";

export const PlanRecipe = ({day}: {day: PlannedDay}) => {
    return (
        <>
            {day.plannedRecipes.map((recipe, recIndex) => (
                <div key={recIndex} className="plan-recipe">
                    <p>{recipe.typeOfMeal}</p>
                    <p>{recipe.recipeName}</p>
                </div>
            ))}
        </>
    );
}