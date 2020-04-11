import React from 'react';
import {Form, Button, Jumbotron} from 'react-bootstrap';

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            rating: 0,
        }
        this.handleName = this.handleName.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }

    handleName(event){
        this.setState({name: event.target.value});
    }

    handleRating(event){
        this.setState({rating: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {
            name: this.state.name,
            rating: this.state.rating
        }
        //console.log(this.state);
        console.log(data);

        fetch('http://localhost:5000/movie/create', {
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async res => await res.json()).then(res=>console.log(res.data));

    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Jumbotron>
                    <h2 variant='danger'>Create movie page</h2>
                </Jumbotron>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter the movie name' onChange={this.handleName}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type='text' placeholder='Enter the movie rating' onChange={this.handleRating}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control>

                    </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={this.createMovie}>Submit</Button>{' '}
                <Button variant='danger'>Clear form</Button>{' '}
                <Button variant='secondary'>Cancel</Button>
            </Form>
        )
    }
}

export default CreatePage;