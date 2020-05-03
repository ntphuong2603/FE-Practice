import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    list-style-type: none;
    overflow: hidden;
    font-size: 22px;
    font-family: sans-serif;
    font-weight: bold;
    background-color: papayawhip;
    color: palevioletred;
`;

const ListItem = styled.li`
    display: inline-block;
    padding: 10px;
    margin-right: 15px;
    :hover {
        color: white;
        background-color: palevioletred;
        cursor: pointer;
    };
    background-color: ${props => props.isActive ? "palevioletred":""};
    color: ${props => props.isActive ? "white":""};
`;

export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
        this.state = this.setInitialState();
        this.handleActive = this.handleActive.bind(this);
    }

    setInitialState(){
        let status = {};
        status['isActive'] = this.props.menu[0];
        return status;
    }

    handleActive = (menuName)=>{
        const previous = this.state;
        previous['isActive'] = menuName;
        this.setState({...previous})
    }

    render(){
        return(
            <List>
                {this.props.menu.map((eachItem)=>{
                    return(
                        <ListItem 
                            isActive={this.state.isActive === eachItem} 
                            key={eachItem}
                            onClick={this.handleActive.bind(this,eachItem)}
                            >{eachItem}
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}