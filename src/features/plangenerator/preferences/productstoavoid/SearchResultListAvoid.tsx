import {SearchResultAvoid} from "./SearchResultAvoid.tsx";
import {Dispatch, SetStateAction, useContext} from "react";
import {Product} from "../../../../models/models.ts";
import "../../../../assets/css/plangenerator/AddForm.css"
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import dayjs from "dayjs";

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
            type: 'ADD_PRODUCTS_TO_AVOID',
            diet: {id: 0, name: ''},
            portionsNr: 0,
            productToAvoid: row,
            userProduct: {name: '', amount: '', unit: ''},
            startDay: dayjs(),
            mealValues: []
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