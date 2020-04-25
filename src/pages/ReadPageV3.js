import React from 'react';
import {Table, Button, Row, Col, Modal, Form, Badge} from 'react-bootstrap';

class ReadPage extends React.Component{
    constructor(props){
        super(props);
        this.initialState(['name', 'rating', 'time']);
        this.handleShow = this.handleShow.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    initialState = (movieItems) => {
        this.state = {
            movieItems: movieItems,
            movieList: [],
            selectedMovie: {},
            errors: {},
            isShow: false,
            isEdit: true
        }
    }

    componentDidMount(){
        const urlHeroku = 'https://nodejs-cinema.herokuapp.com/api/movies';
        //const urlLocalHost = 'http://localhost:5000/movie/all';
        fetch(urlHeroku)
            .then(res => res.json())
            .then(res => this.setState({movieList: res.data}))
    }

    setStatus = (key, value) => {
        let preState = this.state;
        key.forEach((eachKey, index)=>{
            preState[eachKey] = value[index]
        })
        this.setState(preState)
    }

    handleAction = (actionName, index) => {
        let isEdit = actionName === 'edit';
        let isShow = this.state.isShow;
        let selectedMovie = this.state.movieList[index];
        let errors = {}
        this.setStatus(['isEdit', 'isShow', 'selectedMovie', 'errors'], [isEdit, !isShow, selectedMovie, errors]);
    }

    handleShow = () => {
        this.setStatus(['isShow'], [!this.state.isShow])
    }

    setKeyValue = (key, errorValue, movieValue) => {
        let preErrors = {...this.state.errors};
        let preMovies = {...this.state.selectedMovie};
        preErrors[key] = errorValue;
        preMovies[key] = movieValue;
        this.setState({
            ...this.state,
            selectedMovie: preMovies,
            errors: preErrors
        })
    }

    movieNameValidation = (movieName) => {
        let errorStr = 'Movie name must NOT be empty';
        let name = movieName.trim();
        if (name.length!==0) {
            errorStr = '';
        }
        return [errorStr, movieName]
    }

    movieRatingValidation = (movieRating) => {
        let errorStr = 'Movie rating must be a NUMBER';
        if (!isNaN(parseFloat(movieRating))){
            errorStr = ''
        }
        return [errorStr, movieRating]
    }

    movieTimeValidation = (movieTime) => {
        const timePattern = /^\d{1,2}:\d{2}(,\d{1,2}:\d{2})*?$/;
        let errorStr = 'Movie time must be a string PATTERN hh:mm or hh:mm,hh:mm'
        let timeArray = movieTime.trim()
        if (timePattern.test(timeArray)){
            errorStr = '';
            timeArray = timeArray.split(',');
        }
        return [errorStr, timeArray];
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

    updadteMovies = (code) => {
        let newMovies = this.state.movieList;
        let selectedMovieIndex = null;
        newMovies.forEach((item, index)=>{
            if (item._id === this.state.selectedMovie._id){
                selectedMovieIndex = index;
            }
        })
        //console.log(selectedMovieIndex);
        if (this.state.isEdit){
            newMovies[selectedMovieIndex] = this.state.selectedMovie;
        } else {
            newMovies.splice(selectedMovieIndex, 1)
        }
        //console.log(newMovies);
        if (code === 200){
            this.setState({movieList: newMovies});
        }
    }

    handleConfirm = () => {
        let movieId = this.state.selectedMovie._id;
        const urlHeroku  = `https://nodejs-cinema.herokuapp.com/api/${movieId}`;
        //const urlLocalHost = `http://localhost:5000/movie/${action}/${movie_id}`;
        fetch(urlHeroku, {
            headers: {'Content-Type':'application/json'},
            method: this.state.isEdit ? 'POST' : 'DELETE',
            body: JSON.stringify(this.state.selectedMovie)
        })
            .then(res => res.json())
            .then(res => this.updadteMovies(res.code))
        this.handleShow();
    }

    render(){
        const tableHeader = this.props.headers.map((item)=>{
            return(
                <th>{item}</th>
            )
        });
        
        const ActionModal = () => {
            return(
                <Modal show={this.state.isShow} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b variant="danger">{this.state.isEdit ? 'Edit' : 'Delete'}</b> movie
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Row>
                                    <Col className='col-2'>
                                        <Form.Label>Code</Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type='text' readOnly value={this.state.selectedMovie._id}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            {this.state.movieItems.map((item)=>{
                                return(
                                    <Form.Group>
                                        <Row>
                                            <Col className='col-2'>
                                                <Form.Label>{item[0].toUpperCase() + item.substr(1,)}</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control 
                                                    type='text' 
                                                    value={this.state.selectedMovie[item]}
                                                    readOnly={!this.state.isEdit}
                                                    name={item}
                                                    onChange={this.handleOnChange}
                                                />
                                                {this.state.errors[item] ?
                                                    <Badge variant='danger'>{this.state.errors[item]}</Badge>
                                                    : null
                                                }
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                )
                            })}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="col-12">
                            <Col>
                                <Button block variant="danger" onClick={this.handleConfirm}>
                                    <b>{this.state.isEdit?'Update':'Delete'}</b>
                                </Button>
                            </Col>
                            <Col>
                                <Button block variant="primary" onClick={this.handleShow}>Cancel</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            )
        }
        
        const tableBody = this.state.movieList.map((item, index)=>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.rating}</td>
                    <td>
                        <Row>
                            <Col>
                                <Button block variant="primary" size='sm' onClick={()=>this.handleAction('edit', index)}>Edit</Button>
                            </Col>
                            <Col>
                                <Button block variant="danger" size='sm' onClick={()=>this.handleAction('remove', index)}>Remove</Button>
                            </Col>
                        </Row>
                    </td>
                </tr>
            )
        });

        return(
            <Table responsive hover>
                <thead>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody>
                    {tableBody}
                    {ActionModal()}
                </tbody>
            </Table>
        )
    }
}

export default ReadPage;