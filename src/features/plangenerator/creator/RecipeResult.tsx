import '../../../assets/css/plangenerator/Result.css'
import {DayPlan} from "../../../models/userModels.ts";

interface Props{
    day: DayPlan | undefined
}

export const RecipeResult = ({day}: Props) => {

    return (
        <>
            <div style={{
                backgroundColor: "lightblue",
                height: "150px",
                width: "70em",
                margin: "auto"
            }}>
                <div className="flex-result">
                    {day?.planned_day
                        .sort((a,b) => a.type_of_meal.localeCompare(b.type_of_meal))
                        .map(r => (
                        <div>
                            <div>{r.type_of_meal}</div>
                            <div>{r.recipeName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}