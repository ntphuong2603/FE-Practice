import React from 'react';
import {Form, Row, Col, Button, Badge, Modal} from 'react-bootstrap';

class CreatePage extends React.Component {
    constructor(props){
        super(props);
        this.getInitialState();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    getInitialState = (isInit=true) => {
        let newState = {flags: {}};
        ['movies', 'errors'].forEach((eachState)=>{
            newState[eachState] = {};
            this.props.items.map((item)=>{
                newState[eachState][item] = ''
            })
        })
        if (isInit){
            this.state = newState;
        } else {
            this.setState(newState)
        }
    }

    setKeyValue = (key, errorValue, movieValue) => {
        let preErrors = {...this.state.errors};
        let preMovies = {...this.state.movies};
        preErrors[key] = errorValue;
        preMovies[key] = movieValue;
        let isShowSubmitButton = false;
        if ((key ==='name' && movieValue.length !== 0) || this.state.movies['name'].length !== 0) {
            isShowSubmitButton = true
        }
        this.setState({
            ...this.state,
            movies: preMovies,
            errors: preErrors,
            flags: {
                ...this.state.flags,
                isShowSubmitButton: isShowSubmitButton
            }
        })
    }

    movieNameValidation = (movieName) => {
        let errorStr = 'Movie name must NOT be empty';
        let name = movieName.trim();
        if (name.length) {
            errorStr = '';
        } else {
            name = '';
        }
        return [errorStr, name]
    }

    movieRatingValidation = (movieRating) => {
        let errorStr = 'Movie rating must be a NUMBER';
        let ratingNumber = parseFloat(movieRating);
        if (!ratingNumber){
            ratingNumber = 0.0;
        } else {
            errorStr = ''
        }
        return [errorStr, ratingNumber]
    }

    movieTimeValidation = (movieTime) => {
        const timePattern = /^\d{1,2}:\d{2}[,\d{1,2}:\d{2}]*?$/;
        let errorStr = 'Movie time must be a string PATTERN hh:mm or hh:mm,hh:mm'
        let timeArray = movieTime.trim()
        if (timePattern.test(timeArray)){
            errorStr = '';
            timeArray = timeArray.split(',');
        } else {
            timeArray = [];
        }
        return [errorStr, timeArray]
    }

    movieValidation = (name, value) => {
        let [errorStr, returnValue] = '';
        switch (name) {
            case 'name':
                [errorStr, returnValue] = this.movieNameValidation(value);
                break;
            case 'rating':
                [errorStr, returnValue] = this.movieRatingValidation(value);
                break;
            case 'time':
                [errorStr, returnValue] = this.movieTimeValidation(value);
                break;
            default:
                break;
        }
        return [name, errorStr, returnValue]
    }

    handleOnChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let [keyName, errorStr, keyValue] = this.movieValidation(name, value);
        this.setKeyValue(keyName, errorStr, keyValue);
    }

    handleReset = () => {
        this.getInitialState(false);
        document.getElementById('movieCreateForm').reset();
    }

    isFormValid = () => {
        this.props.items.forEach(item => {
            if (this.state.errors[item].length !== 0){
                return false;
            }
        });
        return true;
    }

    handleShowConfirmation = () => {
        this.setState({
            ...this.state,
            flags:{
                ...this.state.flags,
                isShowConfirmation: !this.state.flags.isShowConfirmation
            }
        })
        if (this.state.flags.isCreated){
            this.handleReset();
        }
    }

    handleSubmit = () => {
        if (this.isFormValid){
            this.handleShowConfirmation();
        } else {
            alert('Form is not valid')
        }
    } 

    handleFormSubmit = () => {
        //fetch functions
        fetch('http://localhost:5000/movie/create',{
            headers: {'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(this.state.movies)
        }).then(res => res.json()).then(res => this.setState({
                ...this.state,
                movies: res.data,
                flags : {
                    ...this.state.flags,
                    isCreated: true
                }
            })
        )
    }

    render(){

        const MovieItems = this.props.items.map((item)=>{
            return(
                <Form.Group>
                    <Form.Label>
                        {item[0].toUpperCase() + item.substr(1,)}{' '}
                    </Form.Label>
                    <Form.Control
                        type='text'
                        size='lg'
                        placeholder={`Enter the movie ${item}`}
                        name={item}
                        onChange={this.handleOnChange}
                    />
                    {this.state.errors[item] === '' ? null : 
                        <Badge variant='danger'>{this.state.errors[item]}</Badge>
                    }
                </Form.Group>
            )
        })

        let MovieCreateConfirmation = (movie) => {
            let modalTitle = 'Movie create confirmation !';
            let movieCode = null;
            let buttonList =
                    <Row>
                        <Col>
                            <Button block variant="secondary" onClick={this.handleShowConfirmation}>Cancel</Button>{' '}
                        </Col>  
                        <Col>
                            <Button block variant='primary' onClick={this.handleFormSubmit}>Confirm</Button>{' '}
                        </Col>    
                    </Row>
            if (this.state.flags.isCreated){
                modalTitle = 'Movie is creadted sucessfully !!!'
                movieCode = 
                    <Form.Group>
                        <Row>
                            <Col className='col-2'>
                                <Form.Label>Code</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control value={this.state.movies._id}/>
                            </Col>
                        </Row>
                    </Form.Group>
                buttonList = 
                    <Row>
                        <Col>
                            <Button block variant="success" onClick={this.handleShowConfirmation}>Close</Button>{' '}
                        </Col>  
                    </Row> 
            }
            return(
                <Modal show={this.state.flags.isShowConfirmation} onHide={this.handleShowConfirmation}>
                    <Modal.Header closeButton>
                        <Modal.Title> {modalTitle} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {movieCode}
                        {this.props.items.map(item=>{
                            return(
                                <Form.Group>
                                    <Row>
                                        <Col className='col-2'>
                                            <Form.Label>{item[0].toUpperCase() + item.substr(1,)}</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control value={this.state.movies[item]}/>
                                        </Col>
                                    </Row>
                                </Form.Group>   
                            )
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Col className='col-2'/>
                        <Col> {buttonList} </Col>
                    </Modal.Footer>
                </Modal>
            )}

        return(
            <Form id='movieCreateForm'>
                {MovieItems}
                <Row>
                    <Col>
                        <Button block size='lg' 
                                variant='primary' 
                                onClick={this.handleSubmit} 
                                disabled={!this.state.flags.isShowSubmitButton}>
                            Submit
                        </Button>
                    </Col>
                    <Col>
                        <Button block size='lg' variant='danger' onClick={this.handleReset}>Reset</Button>
                    </Col>
                </Row>
                {MovieCreateConfirmation(this.state.movies)}
            </Form>
        )
    }
}

export default CreatePage;