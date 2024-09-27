import {useContext} from "react";
import {UserProduct} from "../../../../models/models.ts";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import dayjs from "dayjs";

export const ChosenUserProducts = () => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    const handleDelete = (userProduct: UserProduct) => {
        dispatch?.({
            type: 'DELETE_USER_PRODUCTS',
            diet: {id: 0, name: ''},
            portionsNr: 0,
            productToAvoid: '',
            userProduct: userProduct,
            startDay: dayjs(),
            mealValues: []
        })
    }

    return (
        <div>
            {state?.userProducts?.map((userProduct, id) => (
                <div key={id}>
                    {userProduct.name} - {userProduct.amount} {userProduct.unit}
                    <button onClick={() => handleDelete(userProduct)}>Delete</button>
                </div>
            ))}
        </div>
    );
}