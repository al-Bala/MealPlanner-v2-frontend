import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startdate/StartDate.tsx";
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {MealsDispatchContext} from "../../../context/MealsContext.tsx";
import {useApiUser} from "../../../api/useApiUser.ts";
import useAuth from "../../authentication/hooks/useAuth.ts";
import {PrefsContext} from "../../../context/PreferencesContext.tsx";
import {SavedPrefers} from "../../../models/generatorModels.ts";
import {t} from "i18next";

interface PreferencesProps {
    setIsNextClicked:   Dispatch<SetStateAction<boolean>>
}

export const Preferences = ({setIsNextClicked}: PreferencesProps) => {
    const {auth} = useAuth();
    const apiUser = useApiUser();
    const dispatch = useContext(MealsDispatchContext);
    const state = useContext(PrefsContext);
    const [savedUserPrefers, setSavedUserPrefers] = useState<SavedPrefers>(
        {
            dietId: null,
            portions: null,
            products_to_avoid: []
        });

    useEffect(() => {
        apiUser.getPrefers({userId: auth.userId})
            .then(prefs => {
                if(prefs){
                    setSavedUserPrefers({
                        // diet: prefs.diet,
                        dietId: prefs.dietId,
                        portions: prefs.portions,
                        products_to_avoid: prefs.products_to_avoid
                    });
                }
            });
    }, [])
    
    const handleClick = () => {
        console.log("StatePrefs: " + state.portionsNr);
        apiUser.updatePrefers({
            userId: auth.userId,
            savedPrefers: {
                dietId: state.dietId,
                portions: state.portionsNr,
                products_to_avoid: state.productsToAvoid
            }
        })
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
            <div className="prefs-grid-container">
                <Diet savedDietId={savedUserPrefers.dietId}/>
                <Portions savedPortions={savedUserPrefers.portions}/>
                <ProductsToAvoid savedProductsToAvoid={savedUserPrefers.products_to_avoid}/>
                <UserProducts/>
                <StartDate/>
            </div>
            <button onClick={handleClick}>{t('nextButton')}</button>
        </>
    );
}