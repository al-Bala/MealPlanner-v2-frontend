import React, {Dispatch, SetStateAction} from "react";
import "../PrefPage.css"
import { t } from 'i18next';

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setIsRowSelected: Dispatch<SetStateAction<boolean>>
}

export const SearchBarUser = ({searchText, onSearchTextChange, setIsRowSelected}: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchTextChange(e.target.value)
        setIsRowSelected(false)
    }

    return (
        <div className="box">
            <input
                type="text"
                value={searchText}
                placeholder={t('searchMessage')}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}