// export interface Product {
//     id: number;
//     name: string;
//     mainUnit: string;
//     units: string[];
//     weight: number;
// }
import {Dayjs} from "dayjs";

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
    id: number;
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
    unchangingPrefers: UnchangingPrefers;
    userProducts: UserProduct[] | undefined;
    date: string | undefined;
    mealsValues: MealValues[] | null;
}

export interface UnchangingPrefers {
    diet: string | undefined;
    portions: number | string | undefined;
    productsToAvoid: string[] | undefined;
}

export interface MainData {
    diet: DietModel;
    portionsNr: number | string;
    productsToAvoid: string[];
    userProducts: UserProduct[];
    startDay: Dayjs;
    mealValues: MealValues[];
}
