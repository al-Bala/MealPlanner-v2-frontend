import {Meals} from "./meals/Meals.tsx";
import {
    FirstDayRequest,
    PlannedDayGood,
    NextDayRequest,
    UnchangingPrefers,
} from "../../models/models.ts";
import {api} from "../../api.ts";
import {useContext, useEffect, useState} from "react";
import {PrefsContext} from "./PreferencesContext.tsx";
import {MealsContext, MealsDispatchContext} from "./meals/MealsContext.tsx";
import {Result} from "./Result.tsx";

export const GeneratedRecipes= () => {
    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    const dispatchMeals = useContext(MealsDispatchContext);

    const [plannedDaysScreen, setPlannedDaysScreen] = useState<PlannedDayGood[]>([{
        day: Number(statePrefs.startDay.day()),
        date: statePrefs.startDay,
        mealsValues: [{mealId: 'DINNER', timeMin: -1, forHowManyDays: 1}],
        result: {day: '', planned_day: []}
    }]);

    useEffect(() => {
        console.log("PD", plannedDaysScreen);

    }, [plannedDaysScreen]);

    const handleChange = async (i: PlannedDayGood) => {
        const nextDayRequest: NextDayRequest = {
            date: statePrefs.startDay.format('DD-MM-YYYY'),
            mealsValues: stateMeals
        };
        const newVar = await api().postNextDay({nextDayRequest});
        setPlannedDaysScreen(
            plannedDaysScreen.map(m =>
                m.date == i.date
                    ? {...m, result: newVar}
                    : m
            )
        );
    }

    const postData = async (i: PlannedDayGood) => {
        let newVar = null;
        if(i.date == statePrefs.startDay){
            const unchangingPrefs: UnchangingPrefers = {
                diet: statePrefs?.diet.name,
                portions: statePrefs?.portionsNr,
                productsToAvoid: statePrefs?.productsToAvoid
            };

            const firstDayRequest: FirstDayRequest = {
                unchangingPrefers: unchangingPrefs,
                userProducts: statePrefs?.userProducts,
                date: statePrefs?.startDay.format('DD-MM-YYYY'),
                mealsValues: stateMeals
            };
            newVar = await api().postFirstDay({firstDayRequest});
            console.log("ResultValue", newVar);
            console.log("setPD", plannedDaysScreen);
        } else {
            const nextDayRequest: NextDayRequest = {
                date: i.date.format('DD-MM-YYYY'),
                mealsValues: stateMeals
            };
            newVar = await api().postNextDay({nextDayRequest});
        }
        setPlannedDaysScreen(
            plannedDaysScreen.map(m =>
                m.date == i.date
                    ? {...m, result: newVar}
                    : m
            )
        );
    }

    const handleAccept = () => {
        const newDay: PlannedDayGood = {
            day: plannedDaysScreen[plannedDaysScreen.length-1].day + 1,
            date: plannedDaysScreen[plannedDaysScreen.length-1].date?.add(1, 'day'),
            mealsValues: [],
            result: {day: '', planned_day: []}
        };
        if(plannedDaysScreen.length < 7){
            setPlannedDaysScreen([...plannedDaysScreen, newDay]);
        }
        dispatchMeals?.({
            type: 'RESET',
            meal: {mealId: '', timeMin: -1, forHowManyDays: 1}
        })
    }

    return (
        <>
            {plannedDaysScreen.map((i) => (
                <>
                    <Meals item={i} plannedDaysScreen={plannedDaysScreen} setPlannedDaysScreen={setPlannedDaysScreen}/>
                    <div>
                        {i.mealsValues.length !== i.result.planned_day.length &&
                            <button onClick={() => postData(i)} style={{margin: "15px"}}>Znajdż przepisy</button>
                        }
                    </div>
                    <div>
                        {i.result.planned_day.length > 0 &&
                            <>
                                <Result plannedDaysScreenDate={plannedDaysScreen.find((p) => p.date == i.date)}></Result>
                                {i.mealsValues.length == i.result.planned_day.length &&
                                    <>
                                        <button onClick={() => handleChange(i)}>Change</button>
                                        <button onClick={handleAccept}>Accept</button>
                                    </>
                                }
                            </>
                        }
                    </div>
                </>
            ))}
        </>
    )
}