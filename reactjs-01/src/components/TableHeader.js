import React, { Component } from 'react';

class TableHeader extends Component {
    render(){
        return(
            <thead>
                <tr>
                    {this.props.headers.map((item)=>{
                        return(
                            <th>{item}</th>
                        )
                    })}
                </tr>
            </thead>
        )
    }
}

export default TableHeader;