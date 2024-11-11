import React, {Dispatch, SetStateAction, useState} from "react";
import "../../../../assets/css/plangenerator/PrefsPanel.css"
import {t} from 'i18next';
import {Product} from "../../../../models/models.ts";
import {useApiGenerator} from "../../../../api/useApiGenerator.ts";
import {SearchResultListUser} from "./SearchResultListUser.tsx";

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
    setSelectedRow: Dispatch<SetStateAction<Product | undefined>>;
    clear: () => void;
}

export const SearchBarUser = ({searchText, onSearchTextChange, setSelectedRow, clear}: Props) => {
    const apiGenerator = useApiGenerator();
    const [rows, setRows] = useState<Product[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clear();
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
            <SearchResultListUser
                rows={rows}
                setRows={setRows}
                onSearchTextChange={onSearchTextChange}
                setSelectedRow={setSelectedRow}
            />
        </div>
    );
}