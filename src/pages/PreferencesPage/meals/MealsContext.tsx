import {createContext, Dispatch, ReactNode, useReducer} from 'react';
import {MealValues} from "../../../models/models.ts";

interface Props {
    children: ReactNode
}

export const MealsContext = createContext<MealValues[] | null>(null);
export const MealsDispatchContext = createContext<Dispatch<Action> | null>(null);

export function MealsProvider({children}: Props) {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <MealsContext.Provider value={state}>
            <MealsDispatchContext.Provider value={dispatch}>
                {children}
            </MealsDispatchContext.Provider>
        </MealsContext.Provider>
    );
}

interface Action {
    type:
        'ADD_MEAL' |
        'DELETE_MEAL' |
        'SET_TIME' |
        'SET_DAYS'
    meal: MealValues
}

function reducer(state: MealValues[], action: Action) {
    switch (action.type) {
        case 'ADD_MEAL':
            return [...state, action.meal]
        case 'DELETE_MEAL':
            return state.filter(m => m.mealId !== action.meal.mealId);
        case 'SET_TIME':
            return state.map(m =>
                m.mealId === action.meal.mealId ? {...m, timeMin: action.meal.timeMin} : m
            );
        case 'SET_DAYS':
            return state.map(m =>
                m.mealId === action.meal.mealId ? {...m, forHowManyDays: action.meal.forHowManyDays} : m
            );
        default:
            return state;
    }
}