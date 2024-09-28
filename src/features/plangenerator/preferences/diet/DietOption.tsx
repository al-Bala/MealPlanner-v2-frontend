import "../../../../assets/css/plangenerator/PrefPage.css"
import {DietButton} from '../../../../assets/styles/Diet.style.ts';
import {DietModel} from '../../../../models/models.ts';
import {useContext, useEffect, useState} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import {apiGenerator} from "../../../../api/apiGenerator.ts";

export const DietOption = ({savedDiet}: {savedDiet: DietModel | null}) => {
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);
    const [diets, setDiets] = useState<DietModel[]>([]);

    useEffect(() => {
        apiGenerator().getAllDiets()
            .then(response => {
                if(response){
                    setDiets(response)
                }
            })
    }, []);

    useEffect(() => {
        if(savedDiet !== null){
            dispatch?.({
                type: 'SET_DIET',
                diet: savedDiet,
            })
        }
    }, [savedDiet]);

    const handleDietClick = (chosenDiet: DietModel) => {
        dispatch?.({
            type: 'SET_DIET',
            diet: chosenDiet
        });
    }

    return (
        <div className="diet-grid-con">
            {diets.map((chosenDiet) => (
                <DietButton
                    key={chosenDiet.id}
                    onClick={() => handleDietClick(chosenDiet)}
                    $selected={state?.diet?.id == chosenDiet.id}
                >
                    {chosenDiet.name}
                </DietButton>
            ))}
        </div>
    );
}