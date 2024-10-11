import styled from 'styled-components';

export const DietButton = styled.button<{ $selected?: boolean; }>`
    background: ${props => props.$selected ? '#386641' : 'lightgrey'};
    color: ${props => props.$selected ? 'white' : 'black'};

    &:hover {
        background: ${props => props.$selected ? '#2b4d36' : 'darkgrey'};
        border: none;
    }
`;
