import {useState} from "react";
import {Product} from "../../../../models/models.ts";
import {t} from "i18next";
import {SearchBarAvoid} from "./SearchBarAvoid.tsx";
import {SearchResultsList} from "./SearchResultListAvoid.tsx";
import {ChosenProductsToAvoid} from "./ChosenProductsToAvoid.tsx";
import "../../../../assets/css/plangenerator/PrefsProducts.css";

export const ProductsToAvoid = ({savedProductsToAvoid}: {savedProductsToAvoid: string[] | null}) => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Product[]>([]);

    return (
        <div className="prefs-item">
            <div className="pref-section">
                <div>{t('pToAvoidMessage')}:</div>
                <div className="product-grid-con">
                    <div className="product-item">
                        <div>
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
                    <div className="product-item">
                        {t('products')}:
                        <ChosenProductsToAvoid savedProductsToAvoid={savedProductsToAvoid}/>
                    </div>
                </div>
            </div>
        </div>
    );
}