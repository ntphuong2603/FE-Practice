import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
    color: #cc0000;
    font-weight: bold;
    margin: 10px;
    padding: 15px;
    font-family: sans-serif;
`;

const Item = styled.h3`
    font-weight: "bold"
    color: red;
`;

const ItemCount = styled(Item)`
    color: blue;
    display: inline;
`;

export default class Contents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoad: false,
            data: []
        }
    }

    componentDidMount(){
        //const url_heroku ='https://be-library.herokuapp.com/api/generalInfo';
        const url_localHost = 'http://localhost:8080/api/generalInfo';
        fetch(url_localHost)
            .then(res=>res.json())
            .then(res=>this.setState({data: res.data}))
    }

    render(){
        const keys = ['Book', 'Author', 'Genre', 'BookInstance','BookInstance_available'];
        return(
            <>
               <Title>Dynamic content</Title>
               The library has the following records count:
               {keys.map(key=>{
                   return(
                        <Item>{key} : {' '}
                            <ItemCount>{this.state.data[key]}</ItemCount>
                        </Item>
                   )
               })}
               
            </>
        )
    }
}