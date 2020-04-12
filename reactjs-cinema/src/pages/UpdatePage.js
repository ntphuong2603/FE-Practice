import React from 'react';
import {Form, Button, Alert, Col} from 'react-bootstrap';

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            movieSelected: [],
            movieItem: ['Code', 'Name', 'Rating', 'Time']
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event){
        this.setState({movieSelected: this.state.movies[event.target.value]})
    }

    componentDidMount(){
        fetch('http://localhost:5000/movie/all')
            .then(async res => await res.json())
            .then(res => this.setState({movies: res.data}));
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {
            name: this.state.name,
            rating: this.state.rating
        }

        fetch('http://localhost:5000/movie/create', {
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(async res => await res.json())
            .then(res => this.setState({data: res.data, show: !this.state.show}));

    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Alert variant="info">
                    <h2><Alert.Link>Update</Alert.Link> movie page</h2>
                </Alert>
                <Form.Group controlId='movieSelect' onChange={this.handleSelect}>
                    <Form.Row>
                        <Form.Label column lg={2}>Select movie</Form.Label>
                        <Col>
                            <Form.Control as='select'>
                                {this.state.movies.map((item, index)=>{
                                    return(
                                        <option value={index}>{item.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Code</Form.Label>
                        <Col>
                            <Form.Control type='text' value={this.state.movieSelected._id} readOnly/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Name</Form.Label>
                        <Col>
                            <Form.Control type='text' value={this.state.movieSelected.name}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Rating</Form.Label>
                        <Col>
                            <Form.Control type='text' value={this.state.movieSelected.rating}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Time</Form.Label>
                        <Col>
                            <Form.Control type='text' value={this.state.movieSelected.time}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}></Form.Label>
                        <Col>
                            <Button block variant='primary' type='submit'>Update</Button>
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Form>
        )
    }
}

export default CreatePage;