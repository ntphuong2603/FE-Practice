import React from 'react';
import {Form, Button, Alert, Col, Row} from 'react-bootstrap';

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            code: '',
            name: '',
            rating: '',
            time: '',
            method: '',
            urlString : ''
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelect(event){
        let movie = this.state.movies[event.target.value];
        this.setState({
            code: movie._id,
            name: movie.name,
            rating: movie.rating,
            time: movie.time
        })
        //console.log(this.state)
    }

    handleChange(event){
        let name = event.target.name;
        let value = event.target.value;
        if (name ==='name'){
            this.setState({name: value});
        } else if (name === 'rating') {
            this.setState({rating: value});
        } else if (name === 'time') {
            this.setState({time: value});
        }         
        //console.log(this.state)
    }

    handleMethod(event){
        this.setState({
            method : event.target.name === 'delete' ? 'DELETE': 'POST',
            urlString : event.target.name === 'delete' ? 'delete': 'update'
        });
    }
    componentDidMount(){
        fetch('http://localhost:5000/movie/all')
            .then(async res => await res.json())
            .then(res => this.setState({movies: res.data}));
    }

    handleSubmit(event){
        event.preventDefault();
        let submit_url = `http://localhost:5000/movie/${this.state.urlString}/${this.state.code}`;
        
        let data = {
            name: this.state.name,
            rating: this.state.rating,
            time: this.state.time
        }

        let submit_opt = {
            headers: {'Content-Type':'application/json'},
            method: this.state.method,
            body: JSON.stringify(data)
        }

        //console.log(data);
        //console.log(submit_url, submit_opt);
        console.log('Before: ', this.state.movies)
        fetch(submit_url, submit_opt).then(res=>res.json()).then(res => {
            if (this.state.method === 'DELETE') {
                let id = res.data._id;
                let newMovies = this.state.map((item)=>{
                    if (item._id !== id){
                        return item
                    }
                })
                this.setState({movies: newMovies})
            }
        })
        console.log('After:' ,this.state.movies)
        /*
        fetch(`http://localhost:5000/movie/update/${this.state.code}`, {
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(async res => await res.json())
            .then(res => this.setState({data: res.data, show: !this.state.show}));
        */
    }

    render(){
        return(
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Alert variant='warning'>
                    <h2><Alert.Link>Update</Alert.Link> or <Alert.Link variant="danger">Delete</Alert.Link></h2>
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
                            <Form.Control type='text' value={this.state.code} readOnly/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Name</Form.Label>
                        <Col>
                            <Form.Control type='text' name={'name'} value={this.state.name} onChange={this.handleChange}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Rating</Form.Label>
                        <Col>
                            <Form.Control type='text' name='rating' value={this.state.rating} onChange={this.handleChange}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}>Time</Form.Label>
                        <Col>
                            <Form.Control type='text' name='time' value={this.state.time} onChange={this.handleChange}/>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column lg={2}></Form.Label>
                        <Col>
                            <Row>
                                <Col>
                                    <Button block variant='primary' type='submit' name='update' onClick={this.handleMethod}>Update</Button>
                                </Col>
                                <Col>
                                    <Button block variant='danger' type='submit' name='delete' onClick={this.handleMethod}>Delete</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Form>
        )
    }
}

export default CreatePage;