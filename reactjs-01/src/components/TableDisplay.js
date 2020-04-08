import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class DataTable extends Component {
    render(){
        return(
            <Table responsive hover>
                <thead>
                    <tr>
                        {this.props.tableHeaders.map((item)=>{
                            return(
                                <th>{item}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.tableBodies.map((item, index)=>{
                        return(
                            <tr>
                                <th id={item._id}>{index +1}</th>
                                <th>{item.title}</th>
                                <th id={item.author._id}>{item.author.first_name + item.author.family_name}</th>
                                <th id={item.genre._id}>{item.genre.name ?  item.gener.name : ""}</th>
                                <th>{item.summary}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default DataTable;