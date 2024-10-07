import {Date} from "./Date.tsx";
import {TempRecipeResult} from "./TempRecipeResult.tsx";
import {TempDay} from "../../../models/generatorModels.ts";

interface Props {
    tempDays: TempDay[]
}

export const GeneratedDays = ({tempDays}: Props) => {

    return (
        <>
            {tempDays.map((day, index = 0) => (
                <div key={index}>
                    <Date dayIndex={index}/>
                    <TempRecipeResult day={day.tempRecipes}/>
                </div>
            ))}
        </>
    );
}