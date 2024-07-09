import {Dispatch, SetStateAction, useState} from "react";
import {SearchResultUser} from "./SearchResultUser.tsx";
// import {api} from "../../../api.ts";
import {AmountUnit} from "./AmountUnit.tsx";
import "../PrefPage.css"
import {Product, ProductS, UserProduct} from "../../../models/models.ts";
import "../AddForm.css"

interface Props {
    rows: Product[];
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setUserProducts: Dispatch<SetStateAction<UserProduct[]>>
    // setSelectedRow: Dispatch<SetStateAction<Product>>
    isRowSelected: boolean
    setIsRowSelected: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultListUser = ({rows, onSearchTextChange, setUserProducts, isRowSelected, setIsRowSelected}: Props) => {
    // const rows = api().getProducts(searchText)
    // const rows = searchText
    const [selectedRow, setSelectedRow] = useState<Product>({id: '', name: '', mainUnit: '', packingUnits: [], standardWeight: 0});
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
            <div className="nad">
                {!isRowSelected &&
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
            {isRowSelected &&
                <AmountUnit
                    row={selectedRow}
                    setUserProducts={setUserProducts}
                    isRowSelected={isRowSelected}
                    productData={productData}
                    setProductData={setProductData}/>
            }
        </>
    );
}