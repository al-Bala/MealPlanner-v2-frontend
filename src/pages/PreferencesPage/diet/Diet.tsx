import {DietModel} from "../../../models/models.ts";
import {t} from "i18next";
import {DietOption} from "./DietOption.tsx";
import {Dispatch, SetStateAction} from "react";

interface Props{
    diet: DietModel;
    setDiet: Dispatch<SetStateAction<DietModel>>;
    diets: DietModel[];
}

export const Diet = ({diet, setDiet, diets}: Props) =>  {
    return (
        <div style={{ backgroundColor: 'lightblue', marginRight: '0.5em'}}>
            <div>{t('dietMessage')}:</div>
            <DietOption diets={diets} diet={diet} setDiet={setDiet}/>
        </div>
    );
}