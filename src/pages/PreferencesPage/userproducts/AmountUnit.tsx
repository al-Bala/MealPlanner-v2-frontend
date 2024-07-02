import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {Product, ProductS, UserProduct} from '../../../models/models.ts';
import "../PrefPage.css"
import {PcAmountUnit} from "./PcAmountUnit.tsx";
import {t} from 'i18next';

interface Props {
    row: Product;
    setUserProducts: Dispatch<SetStateAction<UserProduct[]>>
    isRowSelected: boolean
    productData: ProductS
    setProductData: Dispatch<SetStateAction<ProductS>>
}

export const AmountUnit = ({row, setUserProducts, isRowSelected, productData, setProductData}: Props) => {
    const [isPcUnitSelected, setIsPcUnitSelected] = useState(false);
    const finalProductData: UserProduct = {name: '', amount: 0, unit: ''};
    const [pcProductData, setPcProductData] = useState<UserProduct>({name: '', amount: 0, unit: ''})

    const handleSubmit = () => {
        finalProductData.name = row.name;
        if (pcProductData.amount) {
            finalProductData.amount = pcProductData.amount;
            finalProductData.unit = pcProductData.unit;
        } else {
            finalProductData.amount = Number(productData.amount);
            finalProductData.unit = productData.unit;
        }
        setUserProducts(prevClickedResults => [...prevClickedResults, finalProductData]);
    };

    const handleUnitClick = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUnit = e.target.value;
        setProductData(prevState => ({...prevState, unit: selectedUnit}));
        selectedUnit == 'szt' ? setIsPcUnitSelected(true) : setIsPcUnitSelected(false)
    };

    return (
        <>
            <div className="box">
                <input className="custom-input"
                       type="number"
                       value={isRowSelected ? productData.amount : ''}
                       placeholder={t('amountMessage')}
                       onChange={(e) =>
                           setProductData(prevState => ({...prevState, amount: e.target.value}))}
                />
            </div>
            <div className="box">
                <select
                    value={productData.unit}
                    onChange={(e) => handleUnitClick(e)}
                >
                    <option value="">--{t('selectUnitMessage')}--</option>
                    {isRowSelected && row.units.map((unit, id) => (
                        <option key={id} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
            {isPcUnitSelected &&
                <PcAmountUnit row={row} setPcProductData={setPcProductData} amount={productData.amount}/>}
            <div className="box">
                <button onClick={handleSubmit}>{t('acceptButton')}</button>
            </div>
        </>
    );
};