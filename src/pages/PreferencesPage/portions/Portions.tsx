import {t} from "i18next";
import {Dispatch, SetStateAction} from "react";

interface Props {
    portionsNr: number | string;
    setPortionsNr: Dispatch<SetStateAction<number | string>>
}

export const Portions = ({portionsNr, setPortionsNr}: Props) =>  {
    return (
        <div style={{ backgroundColor: 'lightblue', marginLeft: '0.5em'}}>
            <div>{t('portionsMessage')}:</div>
            <input
                type="number"
                value={portionsNr}
                // placeholder="Portions"
                placeholder={t('portionsMessage')}
                onChange={(e) => setPortionsNr(e.target.value)}
            />
        </div>
    );
}