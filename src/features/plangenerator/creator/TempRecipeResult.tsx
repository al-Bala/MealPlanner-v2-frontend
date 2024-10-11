import '../../../assets/css/plangenerator/Creator.css'
import {TempRecipe} from "../../../models/generatorModels.ts";

interface Props{
    day: TempRecipe[] | undefined
}

export const TempRecipeResult = ({day}: Props) => {
    return (
        <>
            <div className="recipes-result">
                <div className="recipes-flex-con">
                    {day?.sort((a, b) => a.typeOfMeal.localeCompare(b.typeOfMeal))
                        .map(r => (
                            <div key={r.typeOfMeal}>
                                <div className="recipe-box"
                                     style={r.isRepeated ? {color: "gray", border: "2px solid lightgray"} : {}}
                                >
                                    <div>{r.typeOfMeal}</div>
                                    <div className="photo-box"
                                         style={r.isRepeated ? {border: "1px solid lightgray"} : {}}
                                    >
                                        {r.recipeName}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}