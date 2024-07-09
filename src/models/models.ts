// export interface Product {
//     id: number;
//     name: string;
//     mainUnit: string;
//     units: string[];
//     weight: number;
// }
export interface Product {
    id: string;
    name: string;
    mainUnit: string;
    packingUnits: string[];
    standardWeight: number | null;
}

export interface UserProduct {
    name: string;
    amount: number;
    unit: string;
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
    userProducts: UserProduct[];
    date: string;
    mealsValues: MealValues[];
}

export interface UnchangingPrefers {
    diet: string;
    portions: number | string;
    productsToAvoid: string[];
}