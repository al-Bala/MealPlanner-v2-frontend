// export interface Product {
//     id: number;
//     name: string;
//     mainUnit: string;
//     units: string[];
//     weight: number;
// }
import {Dayjs} from "dayjs";

export const mealsNames: MealModel[] = [
    {id:'BREAKFAST-ID', typeName:'Breakfast', isRepeatable: false},
    // {id:'L', name:'Lunch', days: false},
    {id:'DINNER-ID', typeName:'Dinner', isRepeatable: true},
    {id:'SUPPER-ID', typeName:'Supper', isRepeatable: false}
];

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
    typeName: string;
    isRepeatable: boolean;
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

export interface PlannedDayGood {
    day: number;
    date: Dayjs;
    mealsValues: MealValues[];
    result: ResultM
}
