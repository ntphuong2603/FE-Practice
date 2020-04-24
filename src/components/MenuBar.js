import React from 'react';
import {Nav} from 'react-bootstrap';

class MenuBar extends React.Component{
    render(){
        const menu = ['Create', 'Read', 'Update', 'Delete'].map((item, index)=>{
            return(
                <Nav.Item>
                    <Nav.Link eventKey={index} href={`/#${item.toLowerCase()}`}>{item}</Nav.Link>
                </Nav.Item>
            )
        });
        return(
            <Nav variant="pills" className="flex-column" defaultActiveKey="/#read">
                {menu}
            </Nav>
        )
    }
}

export default MenuBar;