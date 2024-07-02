import "../PrefPage.css"
import {DietButton} from './Diet.style.ts';
import {DietModel} from '../../../models/models.ts';
import {Dispatch, SetStateAction} from "react";

interface Props {
    diets: DietModel[];
    diet: DietModel;
    setDiet: Dispatch<SetStateAction<DietModel>>;
}

export const DietOption = ({diets, diet, setDiet}: Props) => {

    const handleDietClick = (chosenDiet: DietModel) => {
        diet.id == chosenDiet.id ? setDiet({id: 0, name: ''}) : setDiet(chosenDiet)
    }

    return (
        <div>
            {diets.map((chosenDiet) => (
                <DietButton
                    key={chosenDiet.id}
                    onClick={() => handleDietClick(chosenDiet)}
                    selected={diet.id == chosenDiet.id}
                >
                    {chosenDiet.name}
                </DietButton>
            ))}
        </div>
    );
}