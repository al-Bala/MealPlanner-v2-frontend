import { SearchResult } from "./SearchResult.tsx";
// import {api} from "../../../api.ts";
import {Dispatch, SetStateAction} from "react";
import {Product} from "../../../models/models.ts";
import "../AddForm.css"

interface Props {
    rows: Product[]
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setProductsToAvoid: Dispatch<SetStateAction<string[]>>;
}

export const SearchResultsList = ({ rows, onSearchTextChange, setProductsToAvoid }: Props) => {
    // const rows = api().getProducts(searchText)
    // const rows = rows;

    const handleClick = (row: string) => {
        setProductsToAvoid(prevClickedResults => [...prevClickedResults, row]);
        onSearchTextChange('');
    }

    return (
        <>
        <div>
            <div className="nad">
                {rows.map((row) => (
                    <SearchResult
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