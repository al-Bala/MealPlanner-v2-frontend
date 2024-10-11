import {MealValues} from "../../../models/models.ts";
import {apiGenerator} from "../../../api/apiGenerator.ts";
import {useContext, useRef, useState} from "react";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";
import {MealsContext, MealsDispatchContext} from "../../../context/MealsContext.tsx";
import {apiUser} from "../../../api/apiUser.ts";
import useAuth from "../../authentication/hooks/useAuth.ts";
import {RecipeResult} from "./RecipeResult.tsx";
import {MealsChooser} from "./meals/MealsChooser.tsx";
import {GeneratedDays} from "./GeneratedDays.tsx";
import {
    AcceptDayRequest,
    ChangeDayRequest, CreateDayResponse,
    DayResult,
    FirstDayRequest,
    NextDayRequest,
    PlannedDay,
    RecipeResultM,
    SavedPrefers,
    TempDay,
    TempRecipe
} from "../../../models/generatorModels.ts";
import useArraysComparator from "../hooks/useArraysComparator.ts";
import {useNavigate} from "react-router-dom";

export const PlanCreator= () => {
    const {auth} = useAuth();
    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);
    const navigate = useNavigate();
    const arraysComparator = useArraysComparator();

    const [dayIndex, setDayIndex] = useState(0);
    const [repeatedDayIndex, setRepeatedDayIndex] = useState(-1);
    // const [dayResult, setDayResult] = useState<DayResult>({recipesResult: []});
    const [dayResult, setDayResult] = useState<DayResult | null>(null);
    const [currentMeals, setCurrentMeals] = useState<MealValues[]>([]);
    const [tempDays, setTempDays] = useState<TempDay[]>([]);
    const daysToSaveRef = useRef<PlannedDay[]>([]);

    const savedPrefers: SavedPrefers = {
        dietId: statePrefs.dietId,
        portions: statePrefs.portionsNr,
        products_to_avoid: statePrefs.productsToAvoid
    };

    const isMealButtonsChanged = arraysComparator.isMealButtonsChanged({
        currentMeals: currentMeals
    });

    const postData = async () => {
        let response: CreateDayResponse | undefined;
        const isMealRepeated = repeatedDayIndex == dayIndex;
        function deleteRepeatedMeal() {
            if (isMealRepeated) {
                return stateMeals.filter(r => r.mealId !== 'DINNER');
            } else {
                return stateMeals;
            }
        }
        function addRepeatedRecipeToResult(result: DayResult) {
            if (isMealRepeated) {
                const previousDinner = tempDays[tempDays.length - 1].tempRecipes
                    .find(m => m.typeOfMeal === 'DINNER');
                previousDinner && result.recipesResult.push(previousDinner)
                setDayResult({recipesResult: result.recipesResult})
            }
        }
        if(dayIndex == 0){
            const firstDayRequest: FirstDayRequest = {
                savedPrefers: savedPrefers,
                userProducts: statePrefs?.userProducts,
                date: statePrefs?.startDay.format('YYYY-MM-DD'),
                mealsValues: stateMeals
            };
            console.log("First day: " + JSON.stringify(firstDayRequest.mealsValues))
            response = await apiGenerator().postFirstDay({
                firstDayRequest: firstDayRequest
            });
            response && setDayResult(response.dayResult);
        } else {
            console.log("Post - TwoDays: " + repeatedDayIndex);
            console.log("Post - DayIndex: " + dayIndex);
            const newMealValues = deleteRepeatedMeal();
            const allUsedRecipesNames = tempDays
                .flatMap(dayPlan => dayPlan.tempRecipes)
                    .flatMap(recipeDay => recipeDay.recipeName);
            const nextDayRequest: NextDayRequest = {
                savedPrefers: savedPrefers,
                mealsValues: newMealValues,
                usedRecipesNames: allUsedRecipesNames
            };
            console.log("Next day: " + JSON.stringify(nextDayRequest.mealsValues))
            response = await apiGenerator().postNextDay({
                nextDayRequest: nextDayRequest
            });
            response && setDayResult(response.dayResult);
        }
        setCurrentMeals(stateMeals);
        response && addRepeatedRecipeToResult(response.dayResult);
    }

    const handleChange = async () => {
        const changeDayRequest: ChangeDayRequest = {
            savedPrefers: savedPrefers,
            mealsValues: stateMeals,
            recipesNamesToChange: dayResult?.recipesResult.flatMap(r => r.recipeName) || []
        };
        const resultChangeDay = await apiGenerator().changeDay({
            changeDayRequest: changeDayRequest
        });
        console.log("Change: " + resultChangeDay);
        resultChangeDay && setDayResult(resultChangeDay.dayResult);
    }

    const addMappedResultsToDaysToSave = (recipeResults: RecipeResultM[]) => {
        daysToSaveRef.current.push({
            date: '',
            plannedRecipes: recipeResults.map(r => ({
                typeOfMeal: r.typeOfMeal,
                recipeId: r.recipeId,
                recipeName: r.recipeName,
                forHowManyDays: stateMeals
                    .find(m => m.mealId === r.typeOfMeal)?.forHowManyDays || -1,
            }))
        });
    };


    const handleAccept = () => {
        function mapFromDayResultsToTempRecipes() {
            const newTempRecipes: TempRecipe[] = [];
            dayResult?.recipesResult.map(recipe => {
                const updatedTempRecipe: TempRecipe = {
                    typeOfMeal: recipe.typeOfMeal,
                    recipeId: recipe.recipeId,
                    recipeName: recipe.recipeName,
                    forHowManyDays: stateMeals
                        .find(m => m.mealId === recipe.typeOfMeal)?.forHowManyDays || -1,    //??? error
                    isRepeated: repeatedDayIndex == dayIndex && recipe.typeOfMeal == 'DINNER'
                };
                newTempRecipes.push(updatedTempRecipe);
            });
            return newTempRecipes;
        }

        console.log("TwoDays: " + repeatedDayIndex);
        console.log("DayIndex: " + dayIndex);
        dispatch?.({
            type: 'SET_DAYS',
            meal: {mealId: 'DINNER', timeMin: -1, forHowManyDays: 1}
        })
        const tempRecipes = mapFromDayResultsToTempRecipes();

        const acceptDayRequest: AcceptDayRequest = {
            portions: statePrefs.portionsNr,
            tempRecipes: tempRecipes
        };
        // leftovers etc.
        apiGenerator().acceptDay({acceptDayRequest});

        setTempDays([...tempDays, {
            dayIndex: dayIndex,
            tempRecipes: tempRecipes
        }]);
        addMappedResultsToDaysToSave(dayResult?.recipesResult || []);
        setDayIndex(dayIndex + 1)
        setDayResult({recipesResult: []})
        setCurrentMeals([])

        if(repeatedDayIndex == dayIndex) {
            setRepeatedDayIndex(-1);
        }
    }

    const handleSave = () => {
        function addNotAcceptedTempDay() {
            const isTempDaysAndResultEqual = arraysComparator.isTempDaysAndResultEqual({
                tempDays: tempDays,
                result: dayResult
            });
            if (!isTempDaysAndResultEqual && dayResult?.recipesResult.length != 0) {
                addMappedResultsToDaysToSave(dayResult?.recipesResult || []);
            }
        }
        if(repeatedDayIndex !== dayIndex && repeatedDayIndex > 0){
            alert("Masz jeszcze jeden dzień do wygenerowania")
            return
        }
        addNotAcceptedTempDay();
        const promise = apiUser().savePlan({
            userId: auth.userId,
            tempPlan: {startDateText: statePrefs.startDay.format("YYYY-MM-DD"), daysToSave: daysToSaveRef.current}
        })
        console.log("Save: " + promise)
        navigate('/profile')
    }

    return (
        <div >
            <GeneratedDays tempDays={tempDays}/>
            <div className="plan-container">
                <MealsChooser dayIndex={dayIndex} isTwoDays={repeatedDayIndex} setIsTwoDays={setRepeatedDayIndex}/>
                {isMealButtonsChanged ?
                    <div className="rec-search-button">
                        <button onClick={() => postData()}>Znajdż przepisy</button>
                    </div>
                    :
                    <>
                        <RecipeResult dayResult={dayResult}/>
                        {dayResult ?
                            <div className="actions-buttons-box">
                                <button onClick={handleChange}>Change</button>
                                <button onClick={handleAccept}>Next Day</button>
                            </div>
                            :
                            <>Error: Recipes not found</>
                        }
                    </>
                }
            </div>
            <div>
                {dayResult &&
                    <button onClick={handleSave}>Save Plan</button>
                }
            </div>
        </div>
    )
}