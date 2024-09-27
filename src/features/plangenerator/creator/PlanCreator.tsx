import {
    AcceptDayRequest,
    ChangeDayRequest,
    FirstDayRequest,
    MealValues,
    NextDayRequest,
    ResultM2,
    SavedPrefers,
} from "../../../models/models.ts";
import {apiGenerator} from "../../../api/apiGenerator.ts";
import {useContext, useRef, useState} from "react";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";
import {MealsContext} from "../../../context/MealsContext.tsx";
import {apiUser} from "../../../api/apiUser.ts";
import useAuth from "../../authentication/hooks/useAuth.ts";
import {DayPlan} from "../../../models/userModels.ts";
import {RecipeResult} from "./RecipeResult.tsx";
import {MealsChooser} from "./meals/MealsChooser.tsx";
import {GeneratedDays} from "./GeneratedDays.tsx";

export const PlanCreator= () => {
    const {auth} = useAuth();
    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    // const dispatchMeals = useContext(MealsDispatchContext);
    const [dayIndex, setDayIndex] = useState<number>(0);
    const [result, setResult] = useState<ResultM2>({date: '', planned_day: []});
    const [tempDays, setTempDays] = useState<DayPlan[]>([]);
    const tempDaysRef = useRef<DayPlan[]>([]);
    const [currentMeals, setCurrentMeals] = useState<MealValues[]>([]);

    const handleChange = async () => {
        const savedPrefers = getSavePrefers();
        const changeDayRequest: ChangeDayRequest = {
            savedPrefers: savedPrefers,
            mealsValues: stateMeals,
            tempDay: result.planned_day
        };
        const resultChangeDay = await apiGenerator().changeLastDay({changeDayRequest: changeDayRequest});
        console.log("Change: " + resultChangeDay);
        setResult(resultChangeDay);
    }

    const postData = async () => {
        const savedPrefers = getSavePrefers();
        if(dayIndex == 0){
            const firstDayRequest: FirstDayRequest = {
                savedPrefers: savedPrefers,
                userProducts: statePrefs?.userProducts,
                date: statePrefs?.startDay.format('YYYY-MM-DD'),
                mealsValues: stateMeals
            };
            const result1Day = await apiGenerator().postFirstDay({firstDayRequest});
            setResult(result1Day);
        } else {
            const nextDayRequest: NextDayRequest = {
                savedPrefers: savedPrefers,
                // date: i.date.format('YYYY-MM-DD'),
                mealsValues: stateMeals,
                tempDays: tempDays
            };
            const resultNextDay = await apiGenerator().postNextDay({nextDayRequest: nextDayRequest});
            setResult(resultNextDay);
        }
        setCurrentMeals(stateMeals);
    }

    function getSavePrefers() {
        const savedPrefers: SavedPrefers = {
            diet: statePrefs?.diet.name,
            portions: Number(statePrefs?.portionsNr),
            productsToAvoid: statePrefs?.productsToAvoid
        };
        return savedPrefers;
    }

    const handleAccept = () => {
        const acceptDayRequest: AcceptDayRequest = {
            portions: Number(statePrefs?.portionsNr),
            tempDay: result.planned_day
        };

        apiGenerator().acceptDay({acceptDayRequest});

        setTempDays([...tempDays, {date: result.date, planned_day: result.planned_day}]);
        tempDaysRef.current.push({date: result.date, planned_day: result.planned_day});
        setDayIndex(dayIndex + 1)
        setResult({date: '', planned_day: []})
        setCurrentMeals([])
    }

    const handleSave = () => {
        if(!isEqual2 && result.planned_day.length != 0){
            // setTempDays([...tempDays, {date: result.date, planned_day: result.planned_day}]);
            tempDaysRef.current.push({date: result.date, planned_day: result.planned_day});
        }
        const promise = apiUser().savePlan({
            userId: auth.userId,
            tempPlan: {startDateText: statePrefs.startDay.format("YYYY-MM-DD"), tempDays: tempDaysRef.current}
        });
        console.log("Save: " + promise)
    }

    const areArraysEqual = (arr1: string[], arr2: string[]) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    };

    const isEqual2 = areArraysEqual(
        tempDays.length != 0 ? tempDays[tempDays.length - 1].planned_day.flatMap(d => d.recipeId) : [],
        result.planned_day.length != 0 ? result.planned_day.flatMap(d => d.recipeId) : []
    );

    const isMealsButtonsChanged = () => {
        if(currentMeals.length == 0 && stateMeals.length == 0) return false;
        return !isEqual;
    };

    const isEqual = areArraysEqual(
        currentMeals.flatMap(m => m.mealId),
        stateMeals.flatMap(m => m.mealId)
    );

    return (
        <>
            <GeneratedDays tempDays={tempDays}/>
            <MealsChooser dayIndex={dayIndex}/>
            {isMealsButtonsChanged() ?
                <>
                    <button onClick={() => postData()} style={{margin: "15px"}}>Znajdż przepisy</button>
                    {
                        dayIndex != 0 &&
                        <div>
                            <br/><br/>
                            <button onClick={handleSave}>Save Plan</button>
                        </div>
                    }
                </>
                :
                <>
                    <RecipeResult day={result}/>
                    {result?.planned_day.length != 0 &&
                        <>
                            <br/>
                            <button onClick={handleChange}>Change</button>
                            <button onClick={handleAccept}>Next Day</button>
                            <br/><br/>
                            <button onClick={handleSave}>Save</button>
                        </>
                    }
                </>
            }
        </>
    )
}