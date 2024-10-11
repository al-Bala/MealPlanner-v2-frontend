import {MealValues, UserProduct} from "./models.ts";

// PROFILE
export interface History {
    plans: Plan[];
}

export interface Plan {
    plannedDays: PlannedDay[];
}

export interface PlannedDay {
    date: string;
    plannedRecipes: PlannedRecipe[];
}

export interface PlannedRecipe {
    typeOfMeal: string;
    recipeId: string;
    recipeName: string;
    forHowManyDays: number;
}

// PREFERENCES
export interface SavedPrefers {
    dietId: string | null;
    portions: number | null;
    products_to_avoid: string[];
}

// REQUEST
export interface FirstDayRequest {
    savedPrefers: SavedPrefers;
    userProducts: UserProduct[];
    date: string;
    mealsValues: MealValues[];
}

export interface NextDayRequest {
    savedPrefers: SavedPrefers;
    // date: string;
    mealsValues: MealValues[];
    usedRecipesNames: string[]
}

export interface ChangeDayRequest {
    savedPrefers: SavedPrefers;
    // date: string;
    mealsValues: MealValues[];
    recipesNamesToChange: string[]
}

export interface AcceptDayRequest {
    portions: number | null;
    tempRecipes: TempRecipe[]
}

// TO-SAVE
export interface PlanToSave {
    startDateText: string;
    daysToSave: PlannedDay[];
}

// RESULT
export interface CreateDayResponse {
    message: string;
    dayResult: DayResult
}

export interface DayResult {
    recipesResult: RecipeResultM[];
}

export interface RecipeResultM {
    typeOfMeal: string;
    recipeId: string;
    recipeName: string;
}

// TEMP
export interface TempDay {
    dayIndex: number;
    tempRecipes: TempRecipe[];
}

export interface TempRecipe {
    typeOfMeal: string;
    recipeId: string;
    recipeName: string;
    forHowManyDays: number;
    isRepeated: boolean;
}