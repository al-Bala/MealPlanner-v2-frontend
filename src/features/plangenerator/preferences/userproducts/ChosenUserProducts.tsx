import {useContext} from "react";
import {UserProduct} from "../../../../models/models.ts";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import DeleteIcon from '@mui/icons-material/Delete';

export const ChosenUserProducts = () => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    const handleDelete = (userProduct: UserProduct) => {
        dispatch?.({
            type: 'DELETE_USER_PRODUCTS',
            userProduct: userProduct
        })
    }

    return (
        <>
            {state?.userProducts?.map((userProduct, id) => (
                <div className="chosen-prod-grid" key={id}>
                    <div className="name-amount-grid">
                        <div className="product">{userProduct.name}</div>
                        <div className="product">{userProduct.amount} {userProduct.unit}</div>
                    </div>
                    <button onClick={() => handleDelete(userProduct)}><DeleteIcon/></button>
                </div>
            ))}
        </>
    );
}