import styled from 'styled-components';

export const DietButton = styled.button<{ $selected?: boolean; }>`
    background: ${props => props.$selected ? '#88A983' : 'lightgrey'};
    // color: ${props => props.$selected ? 'black' : 'black'};

    &:hover {
        background: ${props => props.$selected ? '#718B6D' : 'darkgrey'};
        border: none;
    }
`;
