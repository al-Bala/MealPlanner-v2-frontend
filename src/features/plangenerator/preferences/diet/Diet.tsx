import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";

export const Diet = ({saveDiet}: {saveDiet: string | null}) =>  {
    return (
        <div style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
            <div>{t('dietMessage')}:</div>
            <DietOption/>
        </div>
    );
}