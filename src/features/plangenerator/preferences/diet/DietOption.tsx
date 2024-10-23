import "../../../../assets/css/plangenerator/PrefsPage.css"
import {DietButton} from '../../../../assets/styles/Diet.style.ts';
import {DietModel} from '../../../../models/models.ts';
import {useContext, useEffect, useState} from "react";
import {PrefsContext, PrefsDispatchContext} from "../../../../context/PreferencesContext.tsx";
import {useApiGenerator} from "../../../../api/useApiGenerator.ts";

export const DietOption = () => {
    const apiGenerator = useApiGenerator();
    const state = useContext(PrefsContext);
    const dispatch = useContext(PrefsDispatchContext);
    const [diets, setDiets] = useState<DietModel[]>([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        apiGenerator.getAllDiets({controller})
            .then(response => {
                if(response){
                    isMounted && setDiets(response)
                }
            });

        return () => {
            isMounted = false;
            controller.abort();
        }
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