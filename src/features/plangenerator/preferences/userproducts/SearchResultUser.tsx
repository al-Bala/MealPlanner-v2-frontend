import "../../../../assets/css/plangenerator/PrefsPage.css"
import {MouseEventHandler} from "react";

interface Props {
    rowName: string;
    onClick: MouseEventHandler<HTMLDivElement> | undefined
}


export const SearchResultUser = ({rowName, onClick}: Props) => {
    return (
        <div className="prod-result" onClick={onClick}>
            {rowName}
        </div>
    );
};