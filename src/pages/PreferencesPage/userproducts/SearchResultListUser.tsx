import {Dispatch, SetStateAction, useState} from "react";
import {SearchResultUser} from "./SearchResultUser.tsx";
import {AmountUnit} from "./AmountUnit.tsx";
import "../PrefPage.css"
import {Product} from "../../../models/models.ts";
import "../AddForm.css"

interface Props {
    rows: Product[];
    setRows:  Dispatch<SetStateAction<Product[]>>;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    isResultSelected: boolean
    setIsResultSelected: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultListUser = ({rows, setRows, onSearchTextChange, isResultSelected, setIsResultSelected}: Props) => {
    const [selectedRow, setSelectedRow] = useState<Product>({
        id: '',
        name: '',
        mainUnit: '',
        packingUnits: [],
        standardWeight: 0
    });

    const handleRowClick = (row: Product) => {
        setSelectedRow(row)
        setIsResultSelected(true)
        onSearchTextChange(row.name)
        setRows([])
    };

    return (
        <>
            <div className="nad">
                {!isResultSelected &&
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
            {isResultSelected &&
                <AmountUnit
                    row={selectedRow}
                    isResultSelected={isResultSelected}
                    setIsResultSelected={setIsResultSelected}
                    onSearchTextChange={onSearchTextChange}
                />
            }
        </>
    );
}