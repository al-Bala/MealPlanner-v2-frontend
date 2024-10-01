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
import {MealsContext, MealsDispatchContext} from "../../../context/MealsContext.tsx";
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
    const [dayIndex, setDayIndex] = useState<number>(0);
    const [result, setResult] = useState<ResultM2>({date: '', planned_day: []});
    const [tempDays, setTempDays] = useState<DayPlan[]>([]);
    const tempDaysRef = useRef<DayPlan[]>([]);
    const [currentMeals, setCurrentMeals] = useState<MealValues[]>([]);
    const [isTwoDays, setIsTwoDays] = useState(-1);
    const dispatch = useContext(MealsDispatchContext);

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
        let newResult: DayPlan;
        if(dayIndex == 0){
            const firstDayRequest: FirstDayRequest = {
                savedPrefers: savedPrefers,
                userProducts: statePrefs?.userProducts,
                date: statePrefs?.startDay.format('YYYY-MM-DD'),
                mealsValues: stateMeals
            };
            console.log("First day: " + JSON.stringify(firstDayRequest.mealsValues))
            newResult = await apiGenerator().postFirstDay({firstDayRequest});
            setResult(newResult);
        } else {
            console.log("Post - TwoDays: " + isTwoDays);
            console.log("Post - DayIndex: " + dayIndex);
            let newMealValues: MealValues[];
            if(isTwoDays == dayIndex){
                newMealValues = stateMeals.filter(r => r.mealId !== 'DINNER');
            } else {
                newMealValues = stateMeals;
            }
            const nextDayRequest: NextDayRequest = {
                savedPrefers: savedPrefers,
                mealsValues: newMealValues,
                tempDays: tempDays
            };
            console.log("Next day: " + JSON.stringify(nextDayRequest.mealsValues))
            newResult = await apiGenerator().postNextDay({nextDayRequest: nextDayRequest});
            setResult(newResult);
        }
        setCurrentMeals(stateMeals);
        if(isTwoDays == dayIndex){
            const repeatedPlannedDay = newResult.planned_day.filter(r => r.type_of_meal !== 'DINNER');
            const previousDay = tempDays[tempDays.length - 1].planned_day;
            const previousDinner = previousDay.find(m => m.type_of_meal === 'DINNER');
            previousDinner && repeatedPlannedDay.push(previousDinner);
            setResult({date: newResult.date, planned_day: repeatedPlannedDay})
        }
    }

    function getSavePrefers() {
        const savedPrefers: SavedPrefers = {
            dietId: statePrefs.dietId,
            portions: statePrefs.portionsNr,
            products_to_avoid: statePrefs.productsToAvoid
        };
        return savedPrefers;
    }

    const handleAccept = () => {
        console.log("TwoDays: " + isTwoDays);
        console.log("DayIndex: " + dayIndex);
        dispatch?.({
            type: 'SET_DAYS',
            meal: {mealId: 'DINNER', timeMin: -1, forHowManyDays: 1}
        })
        if(isTwoDays == dayIndex) {
            setIsTwoDays(-1)
        }
        const acceptDayRequest: AcceptDayRequest = {
            portions: statePrefs.portionsNr,
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
        if(isTwoDays !== dayIndex && isTwoDays > 0){
            alert("Masz jeszcze jeden dzień do wygenerowania")
            return
        }

        if(!isEqual2 && result.planned_day.length != 0){
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
            <MealsChooser dayIndex={dayIndex} isTwoDays={isTwoDays} setIsTwoDays={setIsTwoDays}/>
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