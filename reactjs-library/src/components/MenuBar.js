import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    list-style-type: none;
    margin: 30px;
    padding: 20px;
    overflow: hidden;
    background-color: papayawhip;
    height: 55px;
`;

const ListItem = styled.li`
    float: left;
    display: block;
    color: palevioletred;
    vertical-align: middle;
    margin: auto;
    padding-left: 25px;
    a: hover {
        color: white;
        font-weight: bold;
        background-color: palevioletred;
    }
`;

const LinkItem = styled.a`
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    background-color: ${props => props.isActive ? "palevioletred":"papayawhip"};
    color: ${props => props.isActive ? "white":""};
    border:${props => props.isActive ? "1px solid":""};
    border-radius: ${props => props.isActive ? "10px":""};
    font-weight: ${props => props.isActive ? "bold":""};
    
`;

export default class MenuBar extends React.Component {
    /*
    constructor(props){
        super(props);
    }
        /*
        this.state = {
            isActive: props.menus[0]
        };
        //this.handleActive = this.handleActive.bind(this);
    }
    handleActive = (menuName)=>{
        this.setState({isActive: menuName})
        console.log(this.state);
    }
    */
    render(){
        const params = this.props;
        return(
            <List>
                {params.menus.map((eachItem)=>{
                    return(
                        <ListItem isActive={params.activeMenu===eachItem} key={eachItem}>
                            <a href={eachItem} onClick={()=>params.func(eachItem)}>{eachItem}</a>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}