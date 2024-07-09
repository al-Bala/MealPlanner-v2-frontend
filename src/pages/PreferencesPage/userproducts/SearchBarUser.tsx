import React, {Dispatch, SetStateAction} from "react";
import "../PrefPage.css"
import { t } from 'i18next';
import {Product} from "../../../models/models.ts";
import {api} from "../../../api.ts";

interface Props {
    searchText: string;
    setRows: Dispatch<SetStateAction<Product[]>>;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setIsRowSelected: Dispatch<SetStateAction<boolean>>
}

export const SearchBarUser = ({searchText, setRows, onSearchTextChange, setIsRowSelected}: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value;
        onSearchTextChange(filterText)
        // setIsRowSelected(false)
        setIsRowSelected(false)
        api().getProducts({filterText, setRows})
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