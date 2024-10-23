import {useContext} from "react";
import {UserProduct} from "../../../../models/models.ts";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
// import {FaTrash} from "react-icons/fa";

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
        <div>
            {state?.userProducts?.map((userProduct, id) => (
                <div className="chosen-product-grid-con" key={id}>
                    <div>
                        <div className="product-name">{userProduct.name}</div>
                        <div className="product-name">{userProduct.amount} {userProduct.unit}</div>
                    </div>
                    {/*<button onClick={() => handleDelete(userProduct)}><FaTrash/></button>*/}
                    <button onClick={() => handleDelete(userProduct)}>Delete</button>
                </div>
            ))}
        </div>
    );
}