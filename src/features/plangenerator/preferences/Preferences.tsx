import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startdate/StartDate.tsx";
import {Dispatch, SetStateAction, useContext} from "react";
import {MealsDispatchContext} from "../../../context/MealsContext.tsx";
import {SavedPrefers} from "../../../models/models.ts";
import {apiUser} from "../../../api/apiUser.ts";
import useAuth from "../../authentication/hooks/useAuth.ts";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";

interface PreferencesProps {
    savedUserPrefers: SavedPrefers;
    setIsNextClicked:   Dispatch<SetStateAction<boolean>>
}

export const Preferences = ({savedUserPrefers, setIsNextClicked}: PreferencesProps) => {
    const {auth} = useAuth();
    const dispatch = useContext(MealsDispatchContext);
    const state = useContext(PrefsContext);

    const handleClick = () => {
        console.log("StatePrefs: " + state.portionsNr);
        apiUser().updatePrefers({
            userId: auth.userId,
            savedPrefers: {
                diet: state.diet,
                portions: state.portionsNr,
                products_to_avoid: state.productsToAvoid
            }
        })
        console.log(state.diet?.id)
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
                <Diet savedDiet={savedUserPrefers.diet}/>
                <Portions savedPortions={savedUserPrefers.portions}/>
                <ProductsToAvoid savedProductsToAvoid={savedUserPrefers.products_to_avoid}/>
                <UserProducts/>
                <StartDate/>
            </div>
            <button onClick={handleClick}>Next</button>
        </>
    );
}