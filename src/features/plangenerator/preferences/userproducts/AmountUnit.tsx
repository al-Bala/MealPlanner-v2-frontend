import {ChangeEvent, Dispatch, SetStateAction, useContext, useState} from "react";
import {Product, UserProduct, UserProductAll} from '../../../../models/models.ts';
import "../../../../assets/css/plangenerator/PrefPage.css"
import {PcAmountUnit} from "./PcAmountUnit.tsx";
import {t} from 'i18next';
import {PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import dayjs from "dayjs";

interface Props {
    row: Product;
    isResultSelected: boolean
    onSearchTextChange: Dispatch<SetStateAction<string>>
    setIsResultSelected: Dispatch<SetStateAction<boolean>>;
}

export const AmountUnit = ({row, isResultSelected, onSearchTextChange, setIsResultSelected}: Props) => {
    const dispatch = useContext(PrefsDispatchContext);
    const [isPcUnitSelected, setIsPcUnitSelected] = useState(false);
    const [allProductData, setAllProductData] = useState<UserProductAll>({
        name: '',
        amount: '', unit: '',
        mainAmount: '', mainUnit: ''
    })

    const handleSubmit = () => {
        let finalProductData: UserProduct;
        if (!allProductData.mainAmount) {
            finalProductData = {
                name: row.name,
                amount: allProductData.amount,
                unit: allProductData.unit
            }
        } else {
            finalProductData = {
                name: row.name,
                amount: allProductData.mainAmount,
                unit: allProductData.mainUnit
            }
        }
        dispatch?.({
            type: 'ADD_USER_PRODUCTS',
            diet: {id: 0, name: ''},
            portionsNr: '',
            productToAvoid: '',
            userProduct: finalProductData,
            startDay: dayjs(),
            mealValues: []
        })
        setIsResultSelected(false)
        onSearchTextChange('')
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAllProductData(prevState => ({...prevState, amount: e.target.value}));
    };

    const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUnit = e.target.value;
        setAllProductData(prevState => ({...prevState, unit: selectedUnit}));
        selectedUnit == 'pc.' ? setIsPcUnitSelected(true) : setIsPcUnitSelected(false)
    };

    return (
        <>
            <div className="grid-con">
                <input className="custom-input"
                       type="number"
                       value={isResultSelected ? allProductData.amount : ''}
                       placeholder={t('amountMessage')}
                       onChange={(e) => handleAmountChange(e)}
                />
                <select className="custom-input"
                        value={allProductData.unit}
                        onChange={(e) => handleUnitChange(e)}
                >
                    <option value="">{t('selectUnitMessage')}</option>
                    {isResultSelected && row.packingUnits.map((unit, id) => (
                        <option key={id} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
                {isPcUnitSelected &&
                    <PcAmountUnit row={row} allProductData={allProductData} setAllProductData={setAllProductData}/>}
            </div>
            <div className="box">
                <button onClick={handleSubmit}>{t('addButton')}</button>
            </div>
        </>
    );
};