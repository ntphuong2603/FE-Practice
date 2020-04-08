import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import DataTable from '../components/TableDisplay';

class BookPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            bookList : [],
            isLoaded : false
        }
        let book_url = 'http://localhost:5000/bookApi/list';
    }

    componentDidMount(){
        fetch('http://localhost:5000/bookApi/list')
            .then(res => res.json())
            .then(res => this.setState({
                isLoaded: true,
                bookList: res.data
            }))
    }

    render(){
        return (
            <Table responsive hover>
                <tbody>
                    {this.state.bookList.map((item, index)=>{
                        return(
                            <tr>
                                <th id={item._id}>{index +1}</th>
                                <th>{item.title}</th>
                                <th id={item.author._id}>{item.author.first_name + item.author.family_name}</th>
                                <th>{item.summary}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
export default BookPage;