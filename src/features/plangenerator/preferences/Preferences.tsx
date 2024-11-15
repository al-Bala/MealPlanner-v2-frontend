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
    setIsNextClicked: Dispatch<SetStateAction<boolean>>
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
        let isMounted = true;
        const controller = new AbortController();

        apiUser.getPrefers({controller})
            .then(prefs => {
                if (prefs) {
                    isMounted && setSavedUserPrefers({
                        // diet: prefs.diet,
                        dietId: prefs.dietId,
                        portions: prefs.portions,
                        products_to_avoid: prefs.products_to_avoid
                    });
                }
            });

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleClick = () => {
        dispatch?.({
            type: "RESET",
            meal: {mealId: '', timeMin: 0, forHowManyDays: 0}
        })
        console.log("StatePrefs: " + state.portionsNr);
        apiUser.updatePrefers({
            username: auth.username,
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
        <div className="prefers-section">
            <div className="prefers-container">
                <div className="prefs-grid">
                    <Diet savedDietId={savedUserPrefers.dietId}/>
                    <Portions savedPortions={savedUserPrefers.portions}/>
                    <ProductsToAvoid savedProductsToAvoid={savedUserPrefers.products_to_avoid}/>
                    <UserProducts/>
                    <StartDate/>
                </div>
            </div>
            <button onClick={handleClick}>{t('nextButton')}</button>
        </div>
    );
}