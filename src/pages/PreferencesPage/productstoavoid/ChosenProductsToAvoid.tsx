import {useContext} from "react";
import dayjs from "dayjs";
import {PrefsContext, PrefsDispatchContext} from "../PreferencesContext.tsx";

export const ChosenProductsToAvoid = () => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    const handleDelete = (productToAvoid: string) => {
        dispatch?.({
            type: 'DELETE_PRODUCTS_TO_AVOID',
            diet: {id: 0, name: ''},
            portionsNr: 0,
            productToAvoid: productToAvoid,
            userProduct: {name: '', amount: '', unit: ''},
            startDay: dayjs(),
            mealValues: []
        })
    }

    return (
        <div>
            {state?.productsToAvoid?.map((productToAvoid, id) => (
                <div key={id}>
                    {productToAvoid}
                    <button onClick={() => handleDelete(productToAvoid)}>Delete</button>
                </div>
            ))}
        </div>
    );
}