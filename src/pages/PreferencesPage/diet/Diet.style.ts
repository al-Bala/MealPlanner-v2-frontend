import styled from 'styled-components';

export const DietButton = styled.button<{ selected?: boolean; }>`
    background: ${props => props.selected ? 'blue' : 'lightgrey'};
    color: ${props => props.selected ? 'lightgrey' : 'black'};
`;
