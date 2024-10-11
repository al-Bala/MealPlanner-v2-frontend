import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {Product, UserProductAll} from '../../../../models/models.ts';
import "../../../../assets/css/plangenerator/PrefsPage.css"
import {t} from 'i18next';

interface Props {
    row: Product;
    allProductData: UserProductAll;
    setAllProductData:  Dispatch<SetStateAction<UserProductAll>>;
}

export const AmountUnit = ({row, allProductData, setAllProductData}: Props) => {
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAllProductData(prevState => ({...prevState, amount: e.target.value}));
    };

    const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUnit = e.target.value;
        setAllProductData(prevState => ({...prevState, unit: selectedUnit}));
    };

    return (
        <>
            <div className="prod-AU-grid-con">
                <input className="custom-field"
                       type="number"
                       value={row ? allProductData.amount : ''}
                       placeholder={t('amountMessage')}
                       onChange={(e) => handleAmountChange(e)}
                />
                <select className="custom-field"
                        value={allProductData.unit}
                        onChange={(e) => handleUnitChange(e)}
                >
                    <option value="">{t('selectUnitMessage')}</option>
                    {row && row.packingUnits.map((unit, id) => (
                        <option key={id} value={unit}>
                            {unit}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};