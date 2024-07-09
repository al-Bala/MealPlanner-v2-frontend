import {Dispatch, SetStateAction, useState} from "react";
import {Product} from "../../../models/models.ts";
import {t} from "i18next";
import {SearchBar} from "./SearchBar.tsx";
import {SearchResultsList} from "./SearchResultList.tsx";
import {ChosenProductsToAvoid} from "./ChosenProductsToAvoid.tsx";

interface Props{
    productsToAvoid: string[];
    setProductsToAvoid: Dispatch<SetStateAction<string[]>>;
}

export const ProductsToAvoid = ({productsToAvoid, setProductsToAvoid}: Props) => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Product[]>([]);
    return (
        <div className="item1" style={{ backgroundColor: 'lightblue', height: "auto"}}>
            <div>{t('pToAvoidMessage')}:</div>
            <div className="avoid-prod-container">
                <div className="user-item">
                    <div className="div-user">
                        <SearchBar searchText={searchText} setRows={setRows} onSearchTextChange={setSearchText}/>
                        <SearchResultsList
                            rows={rows}
                            onSearchTextChange={setSearchText}
                            setProductsToAvoid={setProductsToAvoid}
                        />
                    </div>
                </div>
                <div className="user-item">
                    Products:
                    <ChosenProductsToAvoid productsToAvoid={productsToAvoid}/>
                </div>
            </div>
        </div>
    );
}