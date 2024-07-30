import {MealModel, PlannedDayGood} from "../../../models/models.ts";
import {MealChooser} from './MealChooser.tsx';
import './Meals.css'
import {Dispatch, SetStateAction, useContext, useEffect,} from "react";
import {PrefsContext} from "../PreferencesContext.tsx";
import {MealsContext} from "./MealsContext.tsx";

interface Props{
    item: PlannedDayGood;
    // index: number;
    plannedDaysScreen: PlannedDayGood[]
    setPlannedDaysScreen:  Dispatch<SetStateAction<PlannedDayGood[]>>
}

export const Meals= ({item, plannedDaysScreen, setPlannedDaysScreen}: Props) => {
    // const state = useContext(PrefsContext);

    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    // const [isNextClicked, setIsNextClicked] = useState(false);
    // const [result, setResult] = useState<ResultM>({day: '', planned_day: []});

    useEffect(() => {
        console.log("Selected diet:", statePrefs?.diet);
        console.log("Portions number:", statePrefs?.portionsNr);
        console.log("Products to avoid:", statePrefs?.productsToAvoid);
        console.log("User products:", statePrefs?.userProducts);
        console.log("Start date:", statePrefs?.startDay.format('DD-MM-YYYY'));
        console.log("Meals:", stateMeals);
    }, [statePrefs, stateMeals]);

    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const mealsNames: MealModel[] = [
        {id:'BREAKFAST', name:'Breakfast', days: false},
        // {id:'L', name:'Lunch', days: false},
        {id:'DINNER', name:'Dinner', days: true},
        {id:'SUPPER', name:'Supper', days: false}
    ];

    // const submit = () => {
    //     // setIsMealsSet(true)
    // }

    return (
        <div style={{paddingTop: "5em"}}>
            {/*<h2>{daysOfWeek[Number(state?.startDay.day())] + ": " + state?.startDay.format('DD.MM.YYYY')}</h2>*/}
            <h2>{daysOfWeek[Number(item.day)] + ": " + item.date?.format('DD.MM.YYYY')}</h2>

            <p>Wybierz posiłki, które chcesz przygotować</p>
            {/*<div className="grid">*/}
                <div className="flex-container">
                    {mealsNames.map((meal: MealModel) => (
                        // <MealChooser key={meal.id} meal={meal} plannedDays={plannedDaysScreen}>
                        <MealChooser key={meal.id}
                                     date={item.date}
                                     meal={meal}
                                     plannedDaysScreen={plannedDaysScreen}
                                     setPlannedDaysScreen={setPlannedDaysScreen}
                        >
                            {meal.name}
                        </MealChooser>
                    ))}
                </div>
                {/*<div>*/}
                {/*    /!*<button style={{margin: "15px"}}>Pomiń ten dzień</button>*!/*/}
                {/*    /!*<button onClick={postData}>&#128504;</button>*!/*/}
                {/*    <button onClick={postData} style={{margin: "15px"}}>Znajdż przepisy</button>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {isMealsSet &&*/}
                {/*        <>*/}
                {/*            <Result result={result}></Result>*/}
                {/*            <button>Change</button>*/}
                {/*            <button onClick={handleAccept}>Accept</button>*/}
                {/*        </>*/}
                {/*    }*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );
}
