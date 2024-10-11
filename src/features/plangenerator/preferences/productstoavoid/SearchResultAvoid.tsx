import {MouseEventHandler} from "react";
import "../../../../assets/css/plangenerator/PrefsPage.css"

interface Props {
    rowName: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const SearchResultAvoid = ({ rowName, onClick}: Props) => {
    return (
        <div className="prod-result" onClick={onClick}>
            <div>{rowName}</div>
        </div>
    );
};