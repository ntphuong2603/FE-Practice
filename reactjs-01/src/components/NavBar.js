import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:[]
        }
    }

    menuBar = ['Book', 'Author', 'Genre', 'Book-Instance'].map((item)=>{
        return(
            <Nav.Item>
                <Nav.Link href={`/${item.toLowerCase()}`}>{item}</Nav.Link>
            </Nav.Item>
        )
    });

    render(){
        return(
            <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
                {this.menuBar}
            </Nav>
        )
    }
}

export default NavBar;