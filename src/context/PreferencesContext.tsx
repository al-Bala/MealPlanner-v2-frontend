import {createContext, Dispatch, ReactNode, useReducer} from 'react';
import {DietModel, MainData, MealValues, UserProduct} from "../models/models.ts";
import dayjs, {Dayjs} from "dayjs";

interface Props {
    children: ReactNode
}

export const PrefsContext = createContext<MainData>({
    diet: {id: 0, name: ''},
    portionsNr: '',
    productsToAvoid: [],
    userProducts: [],
    startDay: dayjs(),
    mealValues: []
});
export const PrefsDispatchContext = createContext<Dispatch<Action> | null>(null);

export function PrefsProvider({children}: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PrefsContext.Provider value={state}>
            <PrefsDispatchContext.Provider value={dispatch}>
                {children}
            </PrefsDispatchContext.Provider>
        </PrefsContext.Provider>
    );
}

const initialState: MainData = {
    diet: {id: 0, name: ''},
    portionsNr: '',
    productsToAvoid: [],
    userProducts: [],
    startDay: dayjs(),
    mealValues: []
};

interface Action {
    type:
        'SET_DIET' |
        'SET_PORTIONS_NR' |
        'ADD_PRODUCTS_TO_AVOID' |
        'DELETE_PRODUCTS_TO_AVOID' |
        'ADD_USER_PRODUCTS' |
        'DELETE_USER_PRODUCTS' |
        'SET_START_DAY' |
        'SET_MEAL_VALUES',
    diet: DietModel;
    portionsNr: number | string;
    productToAvoid: string;
    userProduct: UserProduct;
    startDay: Dayjs;
    mealValues: MealValues[];
}

function reducer(state: MainData, action: Action) {
    switch (action.type) {
        case 'SET_DIET':
            return {
                ...state,
                diet: state.diet.id == action.diet.id ? {id: 0, name: ''} : action.diet
            };
        case 'SET_PORTIONS_NR':
            return {
                ...state,
                portionsNr: action.portionsNr
            };
        case 'ADD_PRODUCTS_TO_AVOID':
            return {
                ...state,
                productsToAvoid: [...state.productsToAvoid, action.productToAvoid]
            }
        case 'DELETE_PRODUCTS_TO_AVOID':
            return {
                ...state,
                productsToAvoid: state.productsToAvoid.filter(p => p !== action.productToAvoid)
            }
        case 'ADD_USER_PRODUCTS':
            return {
                ...state,
                userProducts: [...state.userProducts, action.userProduct]
            }
        case 'DELETE_USER_PRODUCTS':
            return {
                ...state,
                userProducts: state.userProducts.filter(p => p.name !== action.userProduct.name)
            }
        case 'SET_START_DAY':
            return { ...state, startDay: action.startDay };
        // case 'SET_MEAL_VALUES':
        //     return { ...state, mealValues: action.mealValues };
        default:
            return state;
    }
}