import '../../../assets/css/plangenerator/Creator.css'
import {DayResult} from "../../../models/generatorModels.ts";

interface Props{
    dayResult: DayResult | null
}

export const RecipeResult = ({dayResult}: Props) => {

    return (
        <>
            <div className="recipes-result">
                <div className="recipes-flex-con">
                    {dayResult?.recipesResult
                        .sort((a,b) => a.typeOfMeal.localeCompare(b.typeOfMeal))
                        .map(r => (
                            <div key={r.typeOfMeal}>
                                <div className="recipe-box">
                                    <div>{r.typeOfMeal}</div>
                                    {/*<div>{r.recipeName}</div>*/}
                                    <div className="photo-box">{r.recipeName}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}