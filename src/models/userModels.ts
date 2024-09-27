export interface Profile {
    user: string;
    plans: Plan[];
}

export interface Plan {
    days: DayPlan[];
}

export interface DayPlan {
    date: string;
    planned_day: RecipeDay[];
}

export interface RecipeDay {
    type_of_meal: string;
    recipeId: string;
    recipeName: string;
    forHowManyDays: number;
}

export interface TempPlan {
    startDateText: string;
    tempDays: DayPlan[];
}