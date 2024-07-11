import {MealModel} from "../../../models/models.ts";
import {MealChooser} from './MealChooser.tsx';
import './Meals.css'
import {useContext} from "react";
import {PrefsContext} from "../PreferencesContext.tsx";

export const Meals= () => {
    const state = useContext(PrefsContext);
    
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
            <h2>{daysOfWeek[Number(state?.startDay.day())] + ": " + state?.startDay.format('DD.MM.YYYY')}</h2>

            <div className="grid">
                <div className="flex-container">
                    {mealsNames.map((meal: MealModel) => (
                        <MealChooser key={meal.id} meal={meal}>
                            {meal.name}
                        </MealChooser>
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
