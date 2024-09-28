import {useContext, useEffect} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

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
                <div key={id}>
                    {productToAvoid}
                    <button onClick={() => handleDelete(productToAvoid)}>Delete</button>
                </div>
            ))}
        </div>
    );
}