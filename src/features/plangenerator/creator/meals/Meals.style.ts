import styled from 'styled-components';

export const MealButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : 'lightgrey'};
`;

export const TimeButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : 'lightgrey'};
`;

export const FirstDayMealButton = styled.button<{ $mealName: string, $selected: boolean; }>`
    background: ${props => props.$selected || props.$mealName == 'Dinner' ? '#88A983' : 'lightgrey'};
    color: black;
    width: 100%;
`;

export const RepeatRecipeButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#C2C2C2' : '#88A983'};
    width: 100%;
`;