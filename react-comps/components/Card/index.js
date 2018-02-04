import React from 'react';
import styled from 'styled-components';

const Card = ({className}) => (
    <div className={className}></div>
);
const StyledCard = styled(Card)`
    height: 100px;
    weight: 100px;
    border: 1px solid black;
    padding: 5px;
    background-color: red;
`;

export default StyledCard;
