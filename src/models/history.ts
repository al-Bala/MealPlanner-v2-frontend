export interface History2 {
    plans: Plan[];
}

export interface Plan {
    days: Day[];
}

export interface Day {
    recipes: Recipe2[];
}

export interface Recipe2 {
    typeOfMeal: string;
    recipeId: string;
    recipeName: string;
    forHowManyDays: number;
}