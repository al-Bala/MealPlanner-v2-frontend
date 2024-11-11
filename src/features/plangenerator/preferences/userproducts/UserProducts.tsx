import {useContext, useState} from "react";
import {Product, UserProduct, UserProductAll} from "../../../../models/models.ts";
import {t} from "i18next";
import {SearchBarUser} from "./SearchBarUser.tsx";
import {ChosenUserProducts} from "./ChosenUserProducts.tsx";
import {AmountUnit} from "./AmountUnit.tsx";
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import {PcAmountUnit} from "./PcAmountUnit.tsx";

export const UserProducts = () => {
    const dispatch = useContext(PrefsDispatchContext);
    const [searchText, setSearchText] = useState('');
    const [selectedRow, setSelectedRow] = useState<Product>();
    const [allProductData, setAllProductData] = useState<UserProductAll>({
        name: '',
        amount: '', unit: '',
        mainAmount: '', mainUnit: ''
    })

    const clear = () => {
        setAllProductData({
            name: '',
            amount: '', unit: '',
            mainAmount: '', mainUnit: ''
        })
        setSearchText('')
        setSelectedRow(undefined)
    }

    const handleSubmit = () => {
        let finalProductData: UserProduct;
        if (!allProductData.mainAmount) {
            finalProductData = {
                // name: row.name,
                name: selectedRow?.name || '',
                amount: allProductData.amount,
                unit: allProductData.unit
            }
        } else {
            finalProductData = {
                // name: row.name,
                name: selectedRow?.name || '',
                amount: allProductData.mainAmount,
                unit: allProductData.mainUnit
            }
        }
        dispatch?.({
            type: 'ADD_USER_PRODUCTS',
            userProduct: finalProductData
        })
        clear();
    };

    return (
        <div className="prefs-item product-section">
            <div className="header-box">
                <p>{t('userProductsMessage')}:</p>
            </div>
            <div className="product-grid">
                <div className="product-box">
                    <div className="product-data-box">
                        <SearchBarUser
                            searchText={searchText}
                            onSearchTextChange={setSearchText}
                            setSelectedRow={setSelectedRow}
                            clear={clear}
                        />
                        {selectedRow &&
                            <div className="input-box">
                                <AmountUnit
                                    row={selectedRow}
                                    allProductData={allProductData}
                                    setAllProductData={setAllProductData}
                                />
                                {allProductData.unit == 'pc.' &&
                                    <PcAmountUnit
                                        row={selectedRow}
                                        allProductData={allProductData}
                                        setAllProductData={setAllProductData}
                                    />
                                }
                                {allProductData.unit && allProductData.amount &&
                                    <button
                                        className="add-prod-button"
                                        onClick={handleSubmit}>
                                        {t('addButton')}
                                    </button>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="product-box">
                    <div className="chosen-prod-box">
                        <ChosenUserProducts/>
                    </div>
                </div>
            </div>
        </div>
    );
}