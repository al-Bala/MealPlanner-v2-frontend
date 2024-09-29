import {createContext, Dispatch, ReactNode, useReducer} from 'react';
import {MainData, MealValues, UserProduct} from "../models/models.ts";
import dayjs, {Dayjs} from "dayjs";

interface Props {
    children: ReactNode
}

export const PrefsContext = createContext<MainData>({
    dietId: null,
    portionsNr: null,
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
    dietId: null,
    portionsNr: null,
    productsToAvoid: [],
    userProducts: [],
    startDay: dayjs(),
    mealValues: []
};

interface Action {
    type:
        'SET_DIET' |
        'SET_PORTIONS_NR' |
        'ADD_PRODUCT_TO_AVOID' |
        'SET_PRODUCTS_TO_AVOID' |
        'DELETE_PRODUCTS_TO_AVOID' |
        'ADD_USER_PRODUCTS' |
        'DELETE_USER_PRODUCTS' |
        'SET_START_DAY' |
        'SET_MEAL_VALUES'
    dietId?: string;
    portionsNr?: number;
    oneProductToAvoid?: string;
    listProductsToAvoid?: string[];
    userProduct?: UserProduct;
    startDay?: Dayjs;
    mealValues?: MealValues[];
}

function reducer(state: MainData, action: Action): MainData {
    switch (action.type) {
        case 'SET_DIET':
            return action.dietId ?
                {...state, dietId: state.dietId === action.dietId ? null : action.dietId} : state;

        case 'SET_PORTIONS_NR':
            return action.portionsNr ?
                {...state, portionsNr: action.portionsNr} : state;

        case 'ADD_PRODUCT_TO_AVOID':
            return action.oneProductToAvoid ?
                {...state, productsToAvoid: [...state.productsToAvoid, action.oneProductToAvoid]} : state;

        case 'SET_PRODUCTS_TO_AVOID':
            return action.listProductsToAvoid ?
                {...state, productsToAvoid: action.listProductsToAvoid} : state;

        case 'DELETE_PRODUCTS_TO_AVOID':
            return {
                ...state,
                productsToAvoid: state.productsToAvoid.filter(p => p !== action.oneProductToAvoid)
            }

        case 'ADD_USER_PRODUCTS':
            return action.userProduct ?
                {...state, userProducts: [...state.userProducts, action.userProduct]} : state;

        case 'DELETE_USER_PRODUCTS':
            return {
                ...state,
                userProducts: state.userProducts.filter(p => p.name !== action.userProduct?.name)
            }

        case 'SET_START_DAY':
            return action.startDay ?
                {...state, startDay: action.startDay} : state;

        default:
            return state;
    }
}