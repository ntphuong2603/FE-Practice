import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import TableHeader from '../components/TableDisplay';

class BookPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            bookList : [],
            isLoaded : false
        }
        //let book_url = 'http://localhost:5000/bookApi/list';
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
                <TableHeader headers={['No.','Title', 'Author', 'Action']}/>
                <tbody>
                    {this.state.bookList.map((item, index)=>{
                        return(
                            <tr>
                                <th>{index +1}</th>
                                <td id={item._id}>{item.title}</td>
                                <td id={item.author._id}>{item.author.first_name + item.author.family_name}</td>
                                <td>View, Edit, Delete</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
export default BookPage;