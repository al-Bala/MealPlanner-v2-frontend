import styled from 'styled-components';

export const MealButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : 'lightgrey'};
    //color: ${props => props.$selected ? 'white' : 'black'};
`;

export const TimeButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : 'lightgrey'};
`;

export const FirstDayMealButton = styled.button<{ $mealName: string, $selected: boolean; }>`
    background: ${props => props.$selected || props.$mealName == 'Dinner' ? '#88A983' : 'lightgrey'};
    color: black;
    width: 100%;
`;

export const DaysButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : '#C2C2C2'};
    width: 100%;
`;