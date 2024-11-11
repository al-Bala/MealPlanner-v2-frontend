import {MouseEventHandler} from "react";
import "../../../../assets/css/plangenerator/PrefsProducts.css"

interface Props {
    rowName: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const SearchResultAvoid = ({ rowName, onClick}: Props) => {
    return (
        <div className="prod-result" onClick={onClick}>
            {rowName}
        </div>
    );
};