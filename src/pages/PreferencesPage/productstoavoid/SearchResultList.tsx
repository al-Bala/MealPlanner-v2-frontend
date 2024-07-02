import { SearchResult } from "./SearchResult.tsx";
import {api} from "../../../api.ts";
import {Dispatch, SetStateAction} from "react";

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setProductsToAvoid: Dispatch<SetStateAction<string[]>>;
}

export const SearchResultsList = ({ searchText, onSearchTextChange, setProductsToAvoid }: Props) => {
    const rows = api().getProducts(searchText)
    const handleClick = (row: string) => {
        setProductsToAvoid(prevClickedResults => [...prevClickedResults, row]);
        onSearchTextChange('');
    }
    return (
        <>
        <div>
            <div>
                {rows.map((row) => (
                    <SearchResult
                        row={row.name}
                        key={row.id}
                        onClick={() => handleClick(row.name)}
                    />
                ))}
            </div>
        </div>
        </>
    );
}