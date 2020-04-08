import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class NavBar extends Component {
    menuBar = ['Book', 'Author', 'Genre', 'Book-Instance'].map((item)=>{
        return(
            <Nav.Link href={`/${item.toLowerCase()}`}>{item}</Nav.Link>
        )
    });
    render(){
        return(
            <Nav defaultActiveKey="/home" className="flex-column">
                {this.menuBar}
            </Nav>
        )
    }
}

export default NavBar;