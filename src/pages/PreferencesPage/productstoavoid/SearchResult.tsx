import {MouseEventHandler} from "react";
import "../PrefPage.css"

interface Props {
    row: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const SearchResult = ({ row, onClick}: Props) => {
    return (
        <div onClick={onClick}>
            <div>{row}</div>
        </div>
    );
};