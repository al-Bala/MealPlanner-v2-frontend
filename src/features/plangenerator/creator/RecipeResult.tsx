import '../../../assets/css/plangenerator/Result.css'
import {DayResult} from "../../../models/generatorModels.ts";

interface Props{
    dayResult: DayResult | undefined
}

export const RecipeResult = ({dayResult}: Props) => {

    return (
        <>
            <div style={{
                backgroundColor: "lightblue",
                height: "150px",
                width: "70em",
                margin: "auto"
            }}>
                <div className="flex-result">
                    {dayResult?.recipesResult
                        .sort((a,b) => a.typeOfMeal.localeCompare(b.typeOfMeal))
                        .map(r => (
                        <div key={r.typeOfMeal}>
                            <div>{r.typeOfMeal}</div>
                            <div>{r.recipeName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}