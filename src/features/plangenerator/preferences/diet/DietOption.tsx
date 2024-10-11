import "../../../../assets/css/plangenerator/PrefsPage.css"
import {DietButton} from '../../../../assets/styles/Diet.style.ts';
import {DietModel} from '../../../../models/models.ts';
import {useContext, useEffect, useState} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import {apiGenerator} from "../../../../api/apiGenerator.ts";

export const DietOption = () => {
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

    const handleDietClick = (chosenDiet: DietModel) => {
        dispatch?.({
            type: 'SET_DIET',
            dietId: chosenDiet.id
        });
    }

    return (
        <div className="diet-grid-con">
            {diets.map((chosenDiet) => (
                <DietButton
                    key={chosenDiet.id}
                    onClick={() => handleDietClick(chosenDiet)}
                    $selected={state?.dietId === chosenDiet.id}
                >
                    {chosenDiet.name}
                </DietButton>
            ))}
        </div>
    );
}