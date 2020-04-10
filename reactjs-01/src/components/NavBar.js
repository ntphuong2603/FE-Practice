import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

//const menuBar = ['Book', 'Author', 'Genre', 'Book-Instance'];

class NavBar extends React.Component {
    render(){
        let activeList = new Array(this.props.menuBar.length).fill(false);        
        return(
            <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
                {this.props.menuBar.map((item, index)=>{
                    return(
                        <Nav.Item>
                            <Nav.Link href={`/${item.toLowerCase()}`} className={activeList[index] ? "active" : ""} onClick={activeList[index]=true}>{item}</Nav.Link>
                        </Nav.Item>
                    )
                })}
                {console.log(activeList)}
            </Nav>
        )
    }
}

export default NavBar;