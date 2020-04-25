import React from 'react';
import {Form, Button, Alert, Modal, Row, Col, Badge} from 'react-bootstrap';

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
            status : {
                isShow: false,
                isCreated: false,
                isFormValid: false
            }
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleShow = () => {
        this.setState({status: {
            ...this.state.status, 
            isShow: !this.state.status.isShow
        }})
    }

    handleReset = () => {
        let movie = {
            name: '',
            rating: '',
            time: ''
        }
        this.setState({
            movie: movie, 
            status : {
                ...this.state.status,
                isFormValid: false
            }
        });
        document.getElementById('createForm').reset();
    }

    handleOnChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const timeReg = /^\d{1,2}:\d{2}[,\d{1,2}:\d{2}]*?$/;
        let errors = this.state.errors;
        let movie = this.state.movie;
        let status = this.state.status;
        switch (name) {
            case 'name':
                let nameStr = value.trim();
                if (nameStr.length===0){
                    errors.name = 'Movie name must NOT be empty';
                } else {
                    errors.name = '';
                    movie.name = nameStr;
                }
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
                if (timeReg.test(value)){
                    movie.time = value.split(',');
                    errors.time = '';
                } else {
                    movie.time = '';
                    errors.time = 'Movie time must a string like hh:mm or hh:mm, hh:mm';
                }
                break;
            default:
                break;
        }
        if (!errors.name.length && !errors.rating.length && !errors.time.length){
            status.isFormValid = true;
        }
        this.setState({movie: movie, errros: errors, status: status});
    }

    handleSubmit = () => {
        if (this.state.status.isCreated){
            this.handleReset();
        } 
        if (this.state.status.isFormValid){
            this.setState({
                status: {
                    ...this.state.status, 
                    isShow: !this.state.isShow,
                    isCreated: false
                }
            });
        } else {
            alert('All fields is required!!!')
        }
    };

    handleConfirmed = () => {
        let movie = this.state.movie;
        console.log(movie);
        fetch('http://localhost:5000/movie/create', {
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(movie)
        })
            .then(res => res.json())
            .then(res => this.setState({
                movie: res.data,
                status: {
                    ...this.state.status, 
                    isCreated: !this.state.status.isCreated
                }
            }))
    }

    handleConfirm = (event) => {
        event.preventDefault();
        if (this.state.status.isFormValid){
            this.handleConfirmed();
        }
    };

    render(){
        const Members = this.props.members.map((item)=>{
            return(
                <Form.Group>
                    <Form.Label>
                        {item[0].toUpperCase() + item.substr(1,)}{' '}
                        {this.state.status.isCreated ? 
                            null
                            :
                            <Badge variant='danger'>{this.state.errors[item]}</Badge>
                        }
                    </Form.Label>
                    <Form.Control   type='text' 
                                    placeholder={`Enter the movie ${item}`} 
                                    name={`${item}`} 
                                    onChange={this.handleOnChange}/>
                </Form.Group>
            )
        });

        let MovieCreateConfirmation = (movie) => {
            return(
                <Modal show={this.state.status.isShow} onHide={this.handleShow}>
                    <Modal.Header closeButton={this.handleShow}>
                        <Modal.Title>
                            {this.state.status.isCreated ? 'Movie created sucessfully' : 'Movie create confirmation'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {this.state.status.isCreated ? 
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
                                    {this.state.status.isCreated ? 
                                        null
                                        :
                                        <Button block variant="danger" onClick={this.handleConfirmed}>Confrim</Button>
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
                        <Button block variant='primary' onClick={this.handleSubmit}>Submit</Button>
                    </Col>
                    <Col>
                        <Button block variant='danger' onClick={this.handleReset}>Reset</Button>
                    </Col>
                </Row>
                {MovieCreateConfirmation(this.state.movie)}
            </Form>
        )
    }
}

export default CreatePage;