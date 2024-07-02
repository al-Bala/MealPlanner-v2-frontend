import {Dispatch, SetStateAction, useState} from "react";
import {SearchResultUser} from "./SearchResultUser.tsx";
import {api} from "../../../api.ts";
import {AmountUnit} from "./AmountUnit.tsx";
import "../PrefPage.css"
import {Product, ProductS, UserProduct} from "../../../models/models.ts";

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setUserProducts: Dispatch<SetStateAction<UserProduct[]>>
    isRowSelected: boolean
    setIsRowSelected: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultListUser = ({searchText, onSearchTextChange, setUserProducts, isRowSelected, setIsRowSelected}: Props) => {
    const rows = api().getProducts(searchText)
    const [selectedRow, setSelectedRow] = useState<Product>({id: 0, name: '', mainUnit: '', units: [], weight: 0});
    const [productData, setProductData] = useState<ProductS>({name: '', amount: '', unit: ''})

    const handleRowClick = (row: Product) => {
        setSelectedRow(row)
        setIsRowSelected(true)
        onSearchTextChange(row.name)
        setProductData({
            name: '',
            amount: '',
            unit: ''
        });
    };

    return (
        <>
            <div className="box">
                {!isRowSelected &&
                    rows.map((row) => (
                        <SearchResultUser
                            row={row}
                            key={row.id}
                            onClick={() => handleRowClick(row)}
                        />
                    ))
                }
            </div>
            <AmountUnit
                row={selectedRow}
                setUserProducts={setUserProducts}
                isRowSelected={isRowSelected}
                productData={productData}
                setProductData={setProductData}/>
        </>
    );
}