import {Dispatch, SetStateAction} from "react";
import {SearchResultUser} from "./SearchResultUser.tsx";
import "../../../../assets/css/plangenerator/PrefsPage.css"
import {Product} from "../../../../models/models.ts";

interface Props {
    rows: Product[];
    setRows:  Dispatch<SetStateAction<Product[]>>;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setSelectedRow: Dispatch<SetStateAction<Product | undefined>>;
}

export const SearchResultListUser = ({rows, setRows, onSearchTextChange, setSelectedRow}: Props) => {
    const handleRowClick = (row: Product) => {
        setSelectedRow(row)
        onSearchTextChange(row.name)
        setRows([])
    };

    return (
        <>
            <div className="prod-result-list">
                {rows.length != 0 &&
                    rows.map((row) => (
                        <>
                            <SearchResultUser
                                rowName={row.name}
                                key={row.id}
                                onClick={() => handleRowClick(row)}
                            />
                        </>
                    ))
                }
            </div>
        </>
    );
}