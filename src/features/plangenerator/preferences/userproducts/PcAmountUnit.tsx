import {ChangeEvent, Dispatch, SetStateAction, useEffect} from "react";
import "../../../../assets/css/plangenerator/PrefsPanel.css"
import {t} from 'i18next';
import {Product, UserProductAll} from "../../../../models/models.ts";

interface Props {
    row: Product;
    allProductData: UserProductAll;
    setAllProductData: Dispatch<SetStateAction<UserProductAll>>
}

export const PcAmountUnit = ({row, allProductData, setAllProductData}: Props) => {
    // @ts-ignore
    const pcAmount = row.standardWeight * allProductData.amount;

    useEffect(() => {
        if (pcAmount) {
            setAllProductData(prevState => ({...prevState, mainAmount: pcAmount, mainUnit: row.mainUnit}));
        }
    }, [pcAmount, row, setAllProductData]);

    const handlePcAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAllProductData(prevState => ({...prevState, mainAmount: e.target.value}));
    }

    return (
        <div className="AU-grid">
            <input
                   type="number"
                   value={allProductData.mainAmount}
                   placeholder={t('amountMessage')}
                   onChange={(e) => handlePcAmountChange(e)}
            />
            <div className="main-unit">{row.mainUnit}</div>
        </div>
    );
};