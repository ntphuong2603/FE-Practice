import React from 'react';
import {Form, Button, Alert, Modal} from 'react-bootstrap';

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            rating: 0,
            time: [],
            show: false,
            data: {}
        }
        this.handleName = this.handleName.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    handleShow = () => this.setState({show: !this.state.show});

    handleName(event){
        this.setState({name: event.target.value});
    }

    handleRating(event){
        this.setState({rating: event.target.value});
    }

    handleTime(event){
        /*
        alert(event.target.value);
        let timeArray = event.target.value.split(',');
        this.setState({time: timeArray});
        console.log(timeArray);
        */
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {
            name: this.state.name,
            rating: this.state.rating,
            time: this.state.time.split
        }
        //console.log(this.state);
        console.log(data);

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
            <Form onSubmit={this.handleSubmit.bind(this)} ref='create-movie-form'>
                <Alert variant="primary">
                    <h2><Alert.Link>Create</Alert.Link> movie page</h2>
                </Alert>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter the movie name' onChange={this.handleName} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type='text' placeholder='Enter the movie rating' onChange={this.handleRating} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control>

                    </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit' onClick={this.createMovie}>Submit</Button>{' '}
                <Button variant='danger' >Clear form</Button>
                <Modal show={this.state.show} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Movie created successfully</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Code</Form.Label>
                                <Form.Control type='label' value={this.state.data._id}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='label' value={this.state.data.name}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type='label' value={this.state.data.rating} onChange={()=>{alert()}}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleShow}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        )
    }
}

export default CreatePage;