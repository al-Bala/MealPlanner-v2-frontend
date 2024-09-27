import {RecipeResult} from "./RecipeResult.tsx";
import {DayPlan} from "../../../models/userModels.ts";
import {Date} from "./Date.tsx";

export const GeneratedDays = ({tempDays}: {tempDays: DayPlan[]}) => {

    return (
        <>
            {tempDays.map((day, dayIndex = 0) => (
                <>
                    <div key={dayIndex}></div>
                    <Date dayIndex={dayIndex}/>
                    <RecipeResult day={day}/>
                </>
            ))}
        </>
    );
}