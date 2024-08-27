import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startdate/StartDate.tsx";
import {useContext, useEffect, useState} from "react";
import {GeneratedRecipes} from "./GeneratedRecipes.tsx";
import {MealsDispatchContext} from "../../context/MealsContext.tsx";

export const Preferences = () => {
    const [isNextClicked, setIsNextClicked] = useState(false);
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

    useEffect(() => {
        if (isNextClicked) {
            document.getElementById('target-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isNextClicked]);

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
                    <>
                        <GeneratedRecipes/>
                    </>
                }
                <div style={{height: "600px"}}></div>
            </div>
        </>
    );
}