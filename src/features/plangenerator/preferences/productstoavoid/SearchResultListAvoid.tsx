import {SearchResultAvoid} from "./SearchResultAvoid.tsx";
import {Dispatch, SetStateAction, useContext} from "react";
import {Product} from "../../../../models/models.ts";
import "../../../../assets/css/plangenerator/AddForm.css"
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";

interface Props {
    rows: Product[]
    setRows:  Dispatch<SetStateAction<Product[]>>;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const SearchResultsList = ({ rows, setRows, onSearchTextChange }: Props) => {
    const dispatch = useContext(PrefsDispatchContext);

    const handleClick = (row: string) => {
        setRows([])
        dispatch?.({
            type: 'ADD_PRODUCT_TO_AVOID',
            oneProductToAvoid: row,
        })
        onSearchTextChange('');
    }

    return (
        <>
        <div>
            <div className="nad">
                {rows.map((row) => (
                    <SearchResultAvoid
                        rowName={row.name}
                        key={row.id}
                        onClick={() => handleClick(row.name)}
                    />
                ))}
            </div>
        </div>
        </>
    );
}