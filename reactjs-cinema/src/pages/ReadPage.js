import React from 'react';
import {Table, Form} from 'react-bootstrap';

class ReadPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/movie/all')
            .then(res => res.json())
            .then(res => this.setState({movies: res.data}))
    }

    render(){
        const tableHeader = this.props.headers.map((item, index)=>{
            return(
                <th>{item}</th>
            )
        });

        const tableBody = this.state.movies.map((item, index)=>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.rating}</td>
                    <td>
                        <Form.Check />
                    </td>
                </tr>
            )
        });

        return(
            <Table responsive hover>
                <thead>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>
        )
    }
}

export default ReadPage;