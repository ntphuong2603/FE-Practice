import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: tomato;
    font-weight: bold;
    margin: 10px;
    padding: 15px;
    font-family: sans-serif;
`;

export default class Header extends React.Component {
    render(){
        return(
            <Title>
                Local library - NodeJS & ReactJS
            </Title>
        )
    }
}