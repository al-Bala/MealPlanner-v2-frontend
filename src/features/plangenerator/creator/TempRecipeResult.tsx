import '../../../assets/css/plangenerator/Result.css'
import {TempRecipe} from "../../../models/generatorModels.ts";

interface Props{
    day: TempRecipe[] | undefined
}

export const TempRecipeResult = ({day}: Props) => {
    return (
        <>
            <div style={{
                backgroundColor: "lightblue",
                height: "150px",
                width: "70em",
                margin: "auto"
            }}>
                <div className="flex-result">
                    {day?.sort((a,b) => a.typeOfMeal.localeCompare(b.typeOfMeal))
                        .map(r => (
                        <div style={r.isRepeated ? {color: "white"} : {}} key={r.typeOfMeal}>
                            <div>{r.typeOfMeal}</div>
                            <div>{r.recipeName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}