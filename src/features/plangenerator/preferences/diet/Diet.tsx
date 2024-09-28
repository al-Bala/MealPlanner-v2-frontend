import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";
import {DietModel} from "../../../../models/models.ts";

export const Diet = ({savedDiet}: {savedDiet: DietModel | null}) =>  {
    return (
        <div style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
            <div>{t('dietMessage')}:</div>
            <DietOption savedDiet={savedDiet}/>
        </div>
    );
}