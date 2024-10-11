import styled from 'styled-components';

export const MealButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#386641' : 'lightgrey'};
    color: ${props => props.$selected ? 'white' : 'black'};
`;

export const TimeButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#386641' : 'lightgrey'};
    color: ${props => props.$selected ? 'white' : 'black'};
`;

export const FirstDayMealButton = styled.button<{ $mealName: string, $selected: boolean; }>`
    background: ${props => props.$selected || props.$mealName == 'Dinner' ? '#386641' : 'lightgrey'};
    color: ${props => props.$selected || props.$mealName == 'Dinner' ? 'white' : 'black'};
`;

export const DaysButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? '#386641' : 'lightgrey'};
    color: ${props => props.$selected ? 'white' : 'black'};
`;