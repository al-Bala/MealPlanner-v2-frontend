import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startdate/StartDate.tsx";
import {Dispatch, SetStateAction, useContext} from "react";
import {MealsDispatchContext} from "../../../context/MealsContext.tsx";
import {SavedPrefers} from "../../../models/models.ts";

interface PreferencesProps {
    savedUserPrefers: SavedPrefers;
    setIsNextClicked:   Dispatch<SetStateAction<boolean>>
}

export const Preferences = ({savedUserPrefers, setIsNextClicked}: PreferencesProps) => {
    const dispatch = useContext(MealsDispatchContext);

    const handleClick = () => {
        setIsNextClicked(true);
        const element = document.getElementById('target');
        element?.scrollIntoView({
            behavior: 'smooth'
        });

        dispatch?.({
            type: 'ADD_MEAL',
            meal: {mealId: 'DINNER', timeMin: -1, forHowManyDays: 1}
        })
    };

    return (
        <>
            <div className="grid-container">
                <Diet saveDiet={savedUserPrefers.diet}/>
                <Portions savePortions={savedUserPrefers.portions}/>
                <ProductsToAvoid saveProductsToAvoid={savedUserPrefers.productsToAvoid}/>
                <UserProducts/>
                <StartDate/>
            </div>
            <button onClick={handleClick}>Next</button>
        </>
    );
}