import {PlannedDayGood} from "../../models/models.ts";
import './Result.css'

interface Props{
    plannedDaysScreenDate: PlannedDayGood | undefined
}

export const Result = ({plannedDaysScreenDate}: Props) => {

    return (
        <>
            <div style={{backgroundColor: "lightblue", height: "200px"}}>
                <div className="flex-result">
                    {plannedDaysScreenDate?.result.planned_day.map(r => (
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