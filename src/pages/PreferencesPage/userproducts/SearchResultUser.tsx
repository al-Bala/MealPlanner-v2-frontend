import "../PrefPage.css"
import {MouseEventHandler} from "react";
import "../AddForm.css"

interface Props {
    rowName: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}


export const SearchResultUser = ({rowName, onClick}: Props) => {
    return (
        <div className="search-result" onClick={onClick}>
            {rowName}
        </div>
    );
};