import {Dispatch, SetStateAction} from "react";
import "../PrefPage.css"
import { t } from 'i18next';

interface Props {
    searchText: string;
    onSearchTextChange: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({searchText, onSearchTextChange}: Props) => {
    // const [input, setInput] = useState("");
    // const fetchData = (value) => {
    //     fetch("http://localhost:8080/keywords?query=" + value)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json)
    //             setResults(json)
    //         });
    // };

    return (
        <div className="box">
            <input
                type="text"
                value={searchText}
                placeholder={t('searchMessage')}
                onChange={(e) => onSearchTextChange(e.target.value)}
            />
        </div>
    );
}