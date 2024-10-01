import styled from 'styled-components';

export const MealButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected ? 'lightgrey' : 'black'};
`;

export const TimeButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected ? 'lightgrey' : 'black'};
`;

export const FirstDayMealButton = styled.button<{ $mealName: string, $selected: boolean; }>`
    background: ${props => props.$selected || props.$mealName == 'Dinner' ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected || props.$mealName == 'Dinner' ? 'lightgrey' : 'black'};
`;

export const DaysButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected ? 'lightgrey' : 'black'};
`;