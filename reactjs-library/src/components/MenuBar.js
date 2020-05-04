import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    list-style-type: none;
    margin: 10px;
    padding: 20px;
    diplay: inline;
    overflow: hidden;
    background-color: papayawhip;
`;

const ListItem = styled.li`
    float: left;
    font-family: Calibri;
    a {
        text-decoration: none;
        display: inline-block;
        padding: 7px;
        margin-right: 7px;
        font-size: 20px;
        background-color: ${props => props.isActive ? "palevioletred":"papayawhip"};
        color: ${props => props.isActive ? "white":""};
        border:${props => props.isActive ? "1px solid":""};
        border-radius: ${props => props.isActive ? "10px":""};
        font-weight: ${props => props.isActive ? "bold":""};
        : hover {
            color: tomato;
            font-weight: bold;
            background-color: papayawhip;
            border: 1px solid;
            border-radius: 10px;
        }
    }
    
`;

export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
        const menu = ['Home page', 'Book', 'Author', 'Genre', 'Book-Instance'];
        let isActive = {};
        isActive[menu[0]]=true;
        this.state = {menu, isActive};
        this.handleActive = this.handleActive.bind(this);
    }

    handleActive = (menuName)=>{
        let isActive = this.state.isActive;
        isActive[menuName] = true;
        console.log(this.state);
        this.setState({isActive: isActive});
        console.log(this.state);
    }

    render(){
        return(
            <List>
                {this.state.menu.map((eachItem)=>{
                    return(
                        <ListItem isActive={this.state.isActive[eachItem]} key={eachItem}><a href={eachItem} onClick={()=>{this.handleActive(eachItem)}}>{eachItem}</a></ListItem>
                    )
                })}
            </List>
        )
    }
}