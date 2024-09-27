import {useState} from "react";
import {Product} from "../../../../models/models.ts";
import {t} from "i18next";
import {SearchBarAvoid} from "./SearchBarAvoid.tsx";
import {SearchResultsList} from "./SearchResultListAvoid.tsx";
import {ChosenProductsToAvoid} from "./ChosenProductsToAvoid.tsx";

export const ProductsToAvoid = ({saveProductsToAvoid}: {saveProductsToAvoid: string[]}) => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Product[]>([]);

    return (
        <div className="item1" style={{ backgroundColor: 'lightblue', height: "auto"}}>
            <div>{t('pToAvoidMessage')}:</div>
            <div className="avoid-prod-container">
                <div className="user-item">
                    <div className="div-user">
                        <SearchBarAvoid
                            searchText={searchText}
                            setRows={setRows}
                            onSearchTextChange={setSearchText}
                        />
                        <SearchResultsList
                            rows={rows}
                            setRows={setRows}
                            onSearchTextChange={setSearchText}
                        />
                    </div>
                </div>
                <div className="user-item">
                    Products:
                    <ChosenProductsToAvoid/>
                </div>
            </div>
        </div>
    );
}