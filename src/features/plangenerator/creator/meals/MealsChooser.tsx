import {MealModel} from "../../../../models/models.ts";
import {MealOption} from "./MealOption.tsx";
import {Date} from "../Date.tsx";

export const MealsChooser = ({dayIndex}: {dayIndex: number}) => {
    const mealsNames: MealModel[] = [
        {id:'BREAKFAST', name:'Breakfast', days: false},
        // {id:'L', name:'Lunch', days: false},
        {id:'DINNER', name:'Dinner', days: true},
        {id:'SUPPER', name:'Supper', days: false}
    ];

    return (
        <div>
            <Date dayIndex={dayIndex}/>
            <p>Wybierz posiłki, które chcesz przygotować</p>
            <div style={{width: "80em", margin: "auto"}}>
                <div className="flex-container">
                    {mealsNames.map((meal: MealModel) => (
                        <MealOption key={meal.id}
                                    dayIndex={dayIndex}
                                    meal={meal}
                        >
                            {meal.name}
                        </MealOption>
                    ))}
                </div>
            </div>
        </div>
    );
}