import {MealValues} from "../../../models/models.ts";
import {useApiGenerator} from "../../../api/useApiGenerator.ts";
import {Dispatch, SetStateAction, useContext, useRef, useState} from "react";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";
import {MealsContext, MealsDispatchContext} from "../../../context/MealsContext.tsx";
import {useApiUser} from "../../../api/useApiUser.ts";
import useAuth from "../../authentication/hooks/useAuth.ts";
import {CreatorPanel} from "./meals/CreatorPanel.tsx";
import {
    AcceptDayRequest,
    ChangeDayRequest,
    CreateDayResponse,
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
import {t} from "i18next";
import {Date} from "./Date.tsx";
import "../../../assets/css/plangenerator/creator/Base.css"

interface Props {
    tempDays: TempDay[];
    setTempDays: Dispatch<SetStateAction<TempDay[]>>;
}

export const Creator = ({tempDays, setTempDays}: Props) => {
    const apiUser = useApiUser();
    const apiGenerator = useApiGenerator();
    const {auth} = useAuth();
    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    const dispatch = useContext(MealsDispatchContext);
    const arraysComparator = useArraysComparator();

    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const [repeatedDayIndex, setRepeatedDayIndex] = useState(-1);
    const [dayResult, setDayResult] = useState<DayResult | null>(null);
    const [currentMeals, setCurrentMeals] = useState<MealValues[]>([]);
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
        const isMealRepeated = repeatedDayIndex == currentDayIndex;

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
                    .find(m => m.typeOfMeal === 'Dinner');
                if(previousDinner){
                    const recipesWithoutDinner = result.recipesResult.filter(r => r.typeOfMeal !== 'Dinner');
                    recipesWithoutDinner.push(previousDinner)
                    setDayResult({recipesResult: recipesWithoutDinner})
                }
            }
        }

        if (currentDayIndex == 0) {
            const firstDayRequest: FirstDayRequest = {
                savedPrefers: savedPrefers,
                userProducts: statePrefs?.userProducts,
                date: statePrefs?.startDay.format('YYYY-MM-DD'),
                mealsValues: stateMeals
            };
            console.log("First day: " + JSON.stringify(firstDayRequest.mealsValues))
            response = await apiGenerator.postFirstDay({
                firstDayRequest: firstDayRequest
            });
            response && setDayResult(response.dayResult);
        } else {
            console.log("Post - TwoDays: " + repeatedDayIndex);
            console.log("Post - DayIndex: " + currentDayIndex);
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
            response = await apiGenerator.postNextDay({
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
        const resultChangeDay = await apiGenerator.changeDay({
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
                    isRepeated: repeatedDayIndex == currentDayIndex && recipe.typeOfMeal == 'DINNER'
                };
                newTempRecipes.push(updatedTempRecipe);
            });
            return newTempRecipes;
        }

        console.log("TwoDays: " + repeatedDayIndex);
        console.log("DayIndex: " + currentDayIndex);
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
        apiGenerator.acceptDay({acceptDayRequest});

        setTempDays([...tempDays, {
            dayIndex: currentDayIndex,
            tempRecipes: tempRecipes
        }]);
        addMappedResultsToDaysToSave(dayResult?.recipesResult || []);
        setCurrentDayIndex(currentDayIndex + 1)
        setDayResult({recipesResult: []})
        setCurrentMeals([])

        if (repeatedDayIndex == currentDayIndex) {
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

        if (repeatedDayIndex !== -1) {
            alert("Masz jeszcze jeden dzień do wygenerowania")
            return
        }
        addNotAcceptedTempDay();
        apiUser.savePlan({
            username: auth.username,
            tempPlan: {startDateText: statePrefs.startDay.format("YYYY-MM-DD"), daysToSave: daysToSaveRef.current}
        })
    }

    return (
        <div id="target" className="creator-section">
            <Date dayIndex={currentDayIndex}/>
            <div className="main-relative-box creator-relative-box">
                <div className="background-100-width meals-background"></div>
                <div className="absolute-container">
                    <CreatorPanel currentDayIndex={currentDayIndex}
                                  repeatedDayIndex={repeatedDayIndex}
                                  setRepeatedDayIndex={setRepeatedDayIndex}
                                  isMealButtonsChanged={isMealButtonsChanged}
                                  dayResult={dayResult}
                    />
                </div>
                {!isMealButtonsChanged &&
                    <div className="background-100-width results-background"></div>
                }
            </div>
            {isMealButtonsChanged ?
                <div className="buttons-1">
                    <button className="find-button" onClick={() => postData()}>
                        {t('findRecipesButton')}
                    </button>
                    {dayResult &&
                        <button className="save-button" onClick={handleSave}>
                            {t('savePlanButton')}
                        </button>
                    }
                </div>
                :
                <>
                    {dayResult ?
                        <div className="buttons-2">
                            <div className="actions-buttons">
                                <button onClick={handleChange}>{t('changeButton')}</button>
                                <button onClick={handleAccept}>{t('nextDayButton')}</button>
                            </div>
                            {dayResult &&
                                <button className="save-button" onClick={handleSave}>
                                    {t('savePlanButton')}
                                </button>
                            }
                        </div>
                        :
                        <>Error: Recipes not found</>
                    }
                </>
            }
        </div>
    )
}