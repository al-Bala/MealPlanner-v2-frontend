import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import "../PrefPage.css"
import {t} from 'i18next';
import {Product, UserProduct} from "../../../models/models.ts";

interface Props {
    row: Product;
    setPcProductData: Dispatch<SetStateAction<UserProduct>>
    amount: string
}

export const PcAmountUnit = ({row, setPcProductData, amount}: Props) => {
    const [pcAmount, setPcAmount] = useState(row.weight * Number(amount));

    useEffect(() => {
        if (pcAmount) {
            setPcProductData(prevState => ({...prevState, amount: pcAmount, unit: row.mainUnit}));
        }
    }, [pcAmount, row, setPcProductData]);

    const handlePcAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPcAmount(Number(e.target.value))
        setPcProductData(prevState => ({...prevState, amount: Number(e.target.value)}))
    }

    return (
        <>
            <div className="box">
                <input className="custom-input"
                       type="number"
                       value={pcAmount}
                    // value={row.weight}
                       placeholder={t('amountMessage')}
                       onChange={(e) => handlePcAmountChange(e)}
                />
            </div>
            <div>{row.mainUnit}</div>
        </>
    );
};