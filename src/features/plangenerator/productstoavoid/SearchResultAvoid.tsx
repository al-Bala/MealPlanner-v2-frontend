import {MouseEventHandler} from "react";
import "../../../assets/css/plangenerator/PrefPage.css"
import "../../../assets/css/plangenerator/AddForm.css"

interface Props {
    rowName: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const SearchResultAvoid = ({ rowName, onClick}: Props) => {
    return (
        <div className="search-result" onClick={onClick}>
            <div>{rowName}</div>
        </div>
    );
};