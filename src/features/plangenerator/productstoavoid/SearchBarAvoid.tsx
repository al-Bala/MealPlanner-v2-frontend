import React, {Dispatch, SetStateAction} from "react";
import "../../../assets/css/plangenerator/PrefPage.css"
import { t } from 'i18next';
import {Product} from "../../../models/models.ts";
import {apiGenerator} from "../../../api/apiGenerator.ts";

interface Props {
    searchText: string;
    setRows: Dispatch<SetStateAction<Product[]>>;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const SearchBarAvoid = ({searchText, setRows, onSearchTextChange}: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value;
        onSearchTextChange(filterText)
        apiGenerator().getProducts({filterText, setRows})
    }

    return (
        <>
            <input className="input-search"
                   type="text"
                   value={searchText}
                   placeholder={t('searchMessage')}
                   onChange={(e) => handleChange(e)}
            />
        </>
    );
}