import "../PrefPage.css"
import {Product} from "../../../models/models.ts";
import {MouseEventHandler} from "react";

interface Props {
    row: Product;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}


export const SearchResultUser = ({row, onClick}: Props) => {
    return (
        <div className="results-list" onClick={onClick}>
            {row.name}
        </div>
    );
};