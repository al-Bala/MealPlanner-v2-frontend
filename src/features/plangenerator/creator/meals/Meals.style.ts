import styled from 'styled-components';

export const FirstDayButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected ? 'lightgrey' : 'black'};
`;

export const FirstDayButton1 = styled.button<{ $mealName: string, $selected: boolean; }>`
    background: ${props => props.$selected ||props.$mealName == 'Dinner' ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected || props.$mealName == 'Dinner' ? 'lightgrey' : 'black'};
`;

export const DaysButton = styled.button<{ $selected: boolean; }>`
    background: ${props => props.$selected ? 'blue' : 'lightgrey'};
    color: ${props => props.$selected ? 'lightgrey' : 'black'};
`;