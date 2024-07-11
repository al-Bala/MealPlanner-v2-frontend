import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";

export const Diet = () =>  {
    return (
        <div style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
            <div>{t('dietMessage')}:</div>
            <DietOption/>
        </div>
    );
}