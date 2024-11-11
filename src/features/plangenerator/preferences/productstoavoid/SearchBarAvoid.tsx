import React, {Dispatch, SetStateAction, useState} from "react";
import "../../../../assets/css/plangenerator/PrefsPanel.css"
import {t} from 'i18next';
import {Product} from "../../../../models/models.ts";
import {useApiGenerator} from "../../../../api/useApiGenerator.ts";
import {SearchResultsList} from "./SearchResultListAvoid.tsx";

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const SearchBarAvoid = ({searchText, onSearchTextChange}: Props) => {
    const apiGenerator = useApiGenerator();
    const [rows, setRows] = useState<Product[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value;
        onSearchTextChange(filterText)
        apiGenerator.getProducts({filterText, setRows})
    }

    return (
        <div className="input-box">
            <input
                type="text"
                value={searchText}
                placeholder={t('searchMessage')}
                onChange={(e) => handleChange(e)}
            />
            <SearchResultsList
                rows={rows}
                setRows={setRows}
                onSearchTextChange={onSearchTextChange}
            />
        </div>
    );
}