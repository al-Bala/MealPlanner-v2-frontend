import {MouseEventHandler} from "react";
import "../PrefPage.css"
import "../AddForm.css"

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