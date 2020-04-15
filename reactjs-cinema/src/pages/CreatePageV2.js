import React from 'react';
import {Form, Button, Alert, Modal, Row, Col} from 'react-bootstrap';

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movie: {
                name: '',
                rating: 0,
                time: []
            },
            errors : {
                name: '',
                rating: '',
                time: ''
            },
            show: false,
            created: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClearForm = () => {
        let movie = {
            name: '',
            rating: '',
            time: ''
        }
        this.setState({movie: movie});
        document.getElementById('createForm').reset();
    }

    handleOnChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        let errors = this.state.errors;
        let movie = this.state.movie;
        switch (name) {
            case 'name':
                let nameStr = value.trim();
                if (nameStr.length===0){
                    errors.name = 'Movie name must NOT be empty';
                } else {
                    errors.name = '';
                }
                movie.name = nameStr;
                break;
            case 'rating':
                let ratingNo = parseFloat(value.trim());
                if (ratingNo){
                    movie.rating = ratingNo;
                    errors.rating = '';
                } else {
                    errors.rating = 'Rating must be a number';
                    movie.rating = 0.0;
                }
                break;
            case 'time':
                errors.time = value.split(',') ? movie.time = value.split(',') : 'Movie time must a time like hh:mm';
                break;
            default:
                break;
        }
        this.setState({movie: movie, errors: errors});
    }

    handleShow = () => {
        if (this.state.created){
            this.handleClearForm();
        }
        this.setState({show: !this.state.show, created: false})
    };

    handleSubmit(confirmStatus){
        //event.preventDefault();
        if (confirmStatus){
            console.log(this.state.movie);
            //this.handleShow();
            fetch('http://localhost:5000/movie/create', {
                headers: {'Content-Type':'application/json'},
                method: 'POST',
                body: JSON.stringify(this.state.movie)
            })
                .then(res => res.json())
                .then(res => this.setState({movie: res.data, created: confirmStatus}))
        }
    }

    handelConfrim = (event) => {
        event.preventDefault();
        this.handleSubmit(true)
        //this.setState({show: !this.state.show})
    };

    render(){
        const Members = this.props.members.map((item)=>{
            return(
                <Form.Group>
                    <Form.Label>{item[0].toUpperCase() + item.substr(1,)}</Form.Label>
                    <Form.Control   type='text' 
                                    placeholder={`Enter the movie ${item}`} 
                                    name={`${item}`} 
                                    onChange={this.handleOnChange}/>
                </Form.Group>
            )
        });

        let MovieCreateConfirmation = (movie) => {
            return(
                <Modal show={this.state.show} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.created ? 'Movie created sucessfully' : 'Movie create confirmation'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {this.state.created ? 
                                <Form.Group>
                                    <Row>
                                        <Col className='col-2'>
                                            <Form.Label>Code</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control type='label' value={movie._id}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                : null
                            }
                            {this.props.members.map(item=>{
                                return(
                                    <Form.Group>
                                        <Row>
                                            <Col className='col-2'>
                                                <Form.Label>{item[0].toUpperCase() + item.substr(1,)}</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control type='label' value={movie[item]}/>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                )
                            })}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col className='col-2'></Col>
                            <Row>
                                <Col>
                                    <Button block variant="secondary" onClick={this.handleShow}>Cancel</Button>
                                </Col>
                                <Col>
                                    {this.state.created ? 
                                        null
                                        :
                                        <Button block variant="danger" onClick={this.handelConfrim}>Confrim</Button>
                                    }
                                    
                                </Col>
                            </Row>
                        </Row>
                    </Modal.Footer>
                </Modal>
            )
        };

        return(
            <Form id='createForm'>
                <Alert variant="primary">
                    <h2><Alert.Link>Create</Alert.Link> movie page</h2>
                </Alert>
                {Members}
                <Row>
                    <Col>
                        <Button block variant='primary' onClick={this.handleShow}>Submit</Button>
                    </Col>
                    <Col>
                        <Button block variant='danger' onClick={this.handleClearForm}>Clear form</Button>
                    </Col>
                </Row>
                {MovieCreateConfirmation(this.state.movie)}
            </Form>
        )
    }
}

export default CreatePage;