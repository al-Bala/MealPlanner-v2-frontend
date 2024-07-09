import {useEffect, useState} from "react";
import {UserProduct, DietModel, MealValues, UnchangingPrefers, FirstDayRequest} from '../../models/models.ts';
import "./PrefPage.css"
import {FirstDay} from "./meals/FirstDay.tsx";
import dayjs, {Dayjs} from "dayjs";
import {Diet} from "./diet/Diet.tsx";
import {Portions} from "./portions/Portions.tsx";
import {ProductsToAvoid} from "./productstoavoid/ProductsToAvoid.tsx";
import {UserProducts} from "./userproducts/UserProducts.tsx";
import {StartDate} from "./startDate/StartDate.tsx";
import {api} from "../../api.ts";

export const PreferencesPage = () => {
    const [diet, setDiet] = useState<DietModel>({id: 0, name: ''});
    const [portionsNr, setPortionsNr] = useState<number | string>('');
    const [productsToAvoid, setProductsToAvoid] = useState(['']);
    const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
    const [firstDay, setFirstDay] = useState<Dayjs>(dayjs());
    const [mealValues, setMealValues] = useState<MealValues[]>([]);
    const [isNextClicked, setIsNextClicked] = useState(false);

    useEffect(() => {
        console.log("Selected diet:", diet);
        console.log("Portions number:", portionsNr);
        console.log("Products to avoid:", productsToAvoid);
        console.log("User products:", userProducts);
        console.log("First day:", firstDay.format('DD-MM-YYYY'));
        console.log("Meals:", mealValues);
    }, [diet, portionsNr, productsToAvoid, userProducts, firstDay, mealValues]);

    const DIETS: DietModel[] = [
        {id: 1, name: "vegetarian"},
        {id: 2, name: "vegan"},
        {id: 3, name: "gluten-free"},
        {id: 4, name: "lactose-free"}
    ];

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

    const sub = async () => {
        const up: UnchangingPrefers = {
            diet: diet.name,
            portions: portionsNr,
            productsToAvoid: productsToAvoid
        }
        const fdr: FirstDayRequest = {
            unchangingPrefers: up,
            userProducts: userProducts,
            date: firstDay.format('DD-MM-YYYY'),
            mealsValues: mealValues
        }
        await api().postPreferences(fdr);
    }

    return (
        <>
            <div className="grid-container">
                <Diet diet={diet} setDiet={setDiet} diets={DIETS}/>
                <Portions portionsNr={portionsNr} setPortionsNr={setPortionsNr}/>
                <ProductsToAvoid productsToAvoid={productsToAvoid} setProductsToAvoid={setProductsToAvoid}/>
                <UserProducts userProducts={userProducts} setUserProducts={setUserProducts}/>
                <StartDate firstDay={firstDay} setFirstDay={setFirstDay}/>
            </div>
            <button onClick={handleClick}>Next</button>

            <div id="target">
                {isNextClicked &&
                    <FirstDay firstDay={firstDay} mealValues={mealValues} setMealValues={setMealValues}/>
                }
                <button onClick={sub}>Zatwierdź</button>
            </div>
        </>
    );
}