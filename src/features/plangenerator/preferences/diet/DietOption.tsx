import "../../../../assets/css/plangenerator/PrefPage.css"
import {DietButton} from '../../../../assets/styles/Diet.style.ts';
import {DietModel} from '../../../../models/models.ts';
import {useContext} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import dayjs from "dayjs";

// const DIETS: DietModel[] = [
//     {id: 1, name: "vegetarian"},
//     {id: 2, name: "vegan"},
//     {id: 3, name: "gluten-free"},
//     {id: 4, name: "lactose-free"}
// ];

const DIETS: DietModel[] = [
    {id: 1, name: "wegetariańska"},
    {id: 2, name: "mięsna"}
];

export const DietOption = () => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    const handleDietClick = (chosenDiet: DietModel) => {
        dispatch?.({
            type: 'SET_DIET',
            diet: chosenDiet,
            portionsNr: 0,
            productToAvoid: '',
            userProduct: {name: '', amount: '', unit: ''},
            startDay: dayjs(),
            mealValues: []
        });
    }

    return (
        <div className="diet-grid-con">
            {DIETS.map((chosenDiet) => (
                <DietButton
                    key={chosenDiet.id}
                    onClick={() => handleDietClick(chosenDiet)}
                    $selected={state?.diet.id == chosenDiet.id}
                >
                    {chosenDiet.name}
                </DietButton>
            ))}
        </div>
    );
}