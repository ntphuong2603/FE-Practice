import React from 'react';
import {Form, Button, Alert, Col, Row} from 'react-bootstrap';

class UpdateDeletePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [{'name':'Select movie title ...'}],
            movie: {},
            method: '',
            url: {
                Heroku: 'https://nodejs-cinema.herokuapp.com/api/movies',
                LocalHost: 'http://localhost:8080/api/movies'
            }
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
        if (movie.name === 'Select movie title ...') {
           document.getElementById('update_delete_form').reset();
        }
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
    }

    handleMethod(event){
        this.setState({
            method : event.target.name === 'delete' ? 'DELETE': 'POST',
            urlString : event.target.name === 'delete' ? 'delete': 'update'
        });
    }
    
    componentDidMount(){
        const urlString = this.state.url.Heroku;
        fetch(urlString)
            .then(res => res.json())
            .then(res => {
                let movieList = this.state.movies;
                console.log(movieList);
                movieList.push(...res.data);
                this.setState({movies: movieList})
            });
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
            console.log(res.data);
            let movieDelete = res.data;
            if (this.state.method === 'DELETE') {
                let id = movieDelete._id;
                let newMovies = this.state.map((item)=>{
                    if (item._id !== id){
                        return item
                    }
                })
                this.setState({movies: newMovies})
            }
        })
        console.log('After:' ,this.state.movies)
    }

    render(){
        return(
            <Form id='update_delete_form' onSubmit={this.handleSubmit.bind(this)}>
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
                                    <Button block variant='primary' type='submit' name='update' size='lg' onClick={this.handleMethod}>Update</Button>
                                </Col>
                                <Col>
                                    <Button block variant='danger' type='submit' name='delete' size='lg' onClick={this.handleMethod}>Delete</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Form>
        )
    }
}

export default UpdateDeletePage;