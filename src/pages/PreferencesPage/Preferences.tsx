import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startdate/StartDate.tsx";
import {useContext, useEffect, useState} from "react";
import {Meals} from "./meals/Meals.tsx";
import {PrefsContext} from "./PreferencesContext.tsx";
import {MealsContext} from "./meals/MealsContext.tsx";
import {FirstDayRequest, UnchangingPrefers} from "../../models/models.ts";
import {api} from "../../api.ts";

export const Preferences = () => {

    const statePrefs = useContext(PrefsContext);
    const stateMeals = useContext(MealsContext);
    const [isNextClicked, setIsNextClicked] = useState(false);

    useEffect(() => {
        console.log("Selected diet:", statePrefs?.diet);
        console.log("Portions number:", statePrefs?.portionsNr);
        console.log("Products to avoid:", statePrefs?.productsToAvoid);
        console.log("User products:", statePrefs?.userProducts);
        console.log("Start date:", statePrefs?.startDay.format('DD-MM-YYYY'));
        console.log("Meals:", stateMeals);
    }, [statePrefs, stateMeals]);

    const handleClick = () => {
        setIsNextClicked(true);
        const element = document.getElementById('target');
        element?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (isNextClicked) {
            document.getElementById('target-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isNextClicked]);

    const postData = async () => {
        const unchangingPrefs: UnchangingPrefers = {
            diet: statePrefs?.diet.name,
            portions: statePrefs?.portionsNr,
            productsToAvoid: statePrefs?.productsToAvoid
        };

        const firstDayRequest: FirstDayRequest = {
            unchangingPrefers: unchangingPrefs,
            userProducts: statePrefs?.userProducts,
            date: statePrefs?.startDay.format('DD-MM-YYYY'),
            mealsValues: stateMeals
        };

        await api().postPreferences(firstDayRequest);
    }

    return (
        <>
            <div className="grid-container">
                <Diet/>
                <Portions/>
                <ProductsToAvoid/>
                <UserProducts/>
                <StartDate/>
            </div>
            <button onClick={handleClick}>Next</button>

            <div id="target">
                {isNextClicked &&
                    <Meals/>
                }
                <button onClick={postData}>Zatwierdź</button>
            </div>
        </>
    );
}