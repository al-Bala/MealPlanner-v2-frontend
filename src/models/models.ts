// export interface Product {
//     id: number;
//     name: string;
//     mainUnit: string;
//     units: string[];
//     weight: number;
// }
import {Dayjs} from "dayjs";
import {DayPlan, RecipeDay} from "./userModels.ts";

export interface Product {
    id: string;
    name: string;
    mainUnit: string;
    packingUnits: string[];
    standardWeight: number | null;
}

export interface UserProduct {
    name: string;
    amount: number | string;
    unit: string;
}

export interface UserProductAll {
    name: string;
    amount: number | string;
    unit: string;
    mainAmount: number | string;
    mainUnit: string;
}

export interface ProductS {
    name: string;
    amount: string;
    unit: string;
}

export interface DietModel {
    id: string;
    name: string;
}

export interface MealValues {
    mealId: string;
    timeMin: number;
    forHowManyDays: number;
}

export interface MealModel {
    id: string;
    name: string;
    days: boolean;
}

export interface FirstDayRequest {
    savedPrefers: SavedPrefers;
    userProducts: UserProduct[];
    date: string;
    mealsValues: MealValues[];
}

export interface SavedPrefers {
    dietId: string | null;
    portions: number | null;
    products_to_avoid: string[];
}

export interface MainData {
    dietId: string | null;
    portionsNr: number | null;
    productsToAvoid: string[];
    userProducts: UserProduct[];
    startDay: Dayjs;
    mealValues: MealValues[];
}

export interface PlannedDay {
    type_of_meal: string;
    recipeId: string;
    recipeName: string;
}

export interface ResultM {
    day: string;
    planned_day: PlannedDay[];
}

export interface NextDayRequest {
    savedPrefers: SavedPrefers;
    // date: string;
    mealsValues: MealValues[];
    tempDays: DayPlan[]
}

export interface PlannedDayGood {
    day: number;
    date: Dayjs;
    mealsValues: MealValues[];
    result: ResultM
}

export interface ResultM2 {
    date: string;
    planned_day: RecipeDay[];
}

export interface ChangeDayRequest {
    savedPrefers: SavedPrefers;
    // date: string;
    mealsValues: MealValues[];
    tempDay: RecipeDay[]
}

export interface AcceptDayRequest {
    portions: number | null;
    tempDay: RecipeDay[]
}