import React from 'react';
import {Table} from 'react-bootstrap';
import TableHeader from '../components/TableHeader';
import TableDisplay from '../components/TableDisplay';

class GenrePage extends TableDisplay {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Table responsive hover>
                <TableHeader headers={['No.','Genre name']}/>
                <tbody>
                    {this.state.data.map((item, index)=>{
                        return(
                            <tr>
                                <th>{index +1}</th>
                                <td id={item._id}>{item.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
export default GenrePage;