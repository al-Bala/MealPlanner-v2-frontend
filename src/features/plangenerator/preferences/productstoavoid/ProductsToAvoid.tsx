import {useState} from "react";
import {t} from "i18next";
import {SearchBarAvoid} from "./SearchBarAvoid.tsx";
import {ChosenProductsToAvoid} from "./ChosenProductsToAvoid.tsx";
import "../../../../assets/css/plangenerator/PrefsProducts.css";

export const ProductsToAvoid = ({savedProductsToAvoid}: { savedProductsToAvoid: string[] | null }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="prefs-item product-section">
            <div className="header-box">
                <p>{t('pToAvoidMessage')}:</p>
            </div>
            <div className="product-grid">
                <div className="product-box">
                    <div className="product-data-box">
                        <SearchBarAvoid
                            searchText={searchText}
                            onSearchTextChange={setSearchText}
                        />
                    </div>
                </div>
                <div className="product-box">
                    <div className="chosen-prod-box">
                        <ChosenProductsToAvoid savedProductsToAvoid={savedProductsToAvoid}/>
                    </div>
                </div>
            </div>
        </div>
    );
}