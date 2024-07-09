import dayjs from "dayjs";
import {MealModel, MealValues} from "../../../models/models.ts";
import {Dispatch, SetStateAction} from "react";
import {MealDiv} from './MealDiv.tsx';
import './FirstDay.css'

interface Props {
    firstDay: dayjs.Dayjs;
    mealValues: MealValues[];
    setMealValues: Dispatch<SetStateAction<MealValues[]>>;
}

export const FirstDay= ({firstDay, mealValues, setMealValues}: Props) => {
    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const mealsNames: MealModel[] = [
        {id:'BREAKFAST', name:'Breakfast', days: false},
        // {id:'L', name:'Lunch', days: false},
        {id:'DINNER', name:'Dinner', days: true},
        {id:'SUPPER', name:'Supper', days: false}
    ];

    const submit = () => {
    }

    return (
        <div style={{paddingTop: "5em"}} id="target-section">
            <h2>{daysOfWeek[firstDay.day()] + ": " + firstDay.format('DD.MM.YYYY')}</h2>

            <div className="grid">
                <div className="flex-container">
                    {mealsNames.map((meal: MealModel) => (
                        <MealDiv key={meal.id} meal={meal} mealValues={mealValues} setMealValues={setMealValues}>
                            {meal.name}
                        </MealDiv>
                    ))}
                </div>
                <div>
                    <button>Pomiń</button>
                    <button onClick={submit}>&#128504;</button>
                </div>
            </div>
            <div style={{height: "500px"}}></div>
        </div>
    );
}
