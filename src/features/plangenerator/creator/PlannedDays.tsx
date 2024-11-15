import {Date} from "./Date.tsx";
import {PlannedRecipes} from "./PlannedRecipes.tsx";
import {TempDay} from "../../../models/generatorModels.ts";

interface Props {
    tempDays: TempDay[]
}

export const PlannedDays = ({tempDays}: Props) => {

    return (
        <div className="planned-section">
            {tempDays.map((day, index = 0) => (
                <div key={index} className="planned-day">
                    <div className="planned-date-header">
                        <Date dayIndex={index}/>
                    </div>
                    <div className="main-relative-box planned-relative-box">
                        <div className="background-100-width"></div>
                        <div className="absolute-container">
                            <PlannedRecipes day={day.tempRecipes}/>
                        </div>
                        <div className="background-100-width planned-background"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}