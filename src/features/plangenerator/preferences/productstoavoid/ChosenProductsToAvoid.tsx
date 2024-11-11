import {useContext, useEffect} from "react";
// import { FaTrash } from "react-icons/fa";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import DeleteIcon from "@mui/icons-material/Delete";

export const ChosenProductsToAvoid = ({savedProductsToAvoid}: {savedProductsToAvoid: string[] | null}) => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);

    useEffect(() => {
        if(savedProductsToAvoid !== null){
            dispatch?.({
                type: 'SET_PRODUCTS_TO_AVOID',
                listProductsToAvoid: savedProductsToAvoid,
            })
        }
    }, [savedProductsToAvoid]);

    const handleDelete = (productToAvoid: string) => {
        dispatch?.({
            type: 'DELETE_PRODUCTS_TO_AVOID',
            oneProductToAvoid: productToAvoid
        })
    }

    return (
        <div>
            {state?.productsToAvoid?.map((productToAvoid, id) => (
                <div className="chosen-prod-grid" key={id}>
                    <div className="product">{productToAvoid}</div>
                    <button onClick={() => handleDelete(productToAvoid)}><DeleteIcon/></button>
                </div>
            ))}
        </div>
    );
}