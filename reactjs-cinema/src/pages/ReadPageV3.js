import React from 'react';
import {Table, Button, Row, Col, Modal, Form} from 'react-bootstrap';

class ReadPage extends React.Component{
    constructor(props){
        super(props);
        this.initialState();
        this.handleShow = this.handleShow.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    initialState = () => {
        const itemName = ['name', 'rating', 'time'];
        const statusList = {};
        ['isEdit', 'isShow', 'selectedMovie', 'errors'].map(item=>{
            statusList[item] = ''
            /*
            if (item=='errors'){
                itemName.map((eachItem)=>{
                    statusList[item][eachItem] = "";
                })
            }
            */
        })
        this.state = {
            itemName : itemName,
            movies: [],
            status: statusList,
        };
    }

    componentDidMount(){
        const urlHeroku = 'https://nodejs-cinema.herokuapp.com/api/movies';
        const urlLocalHost = 'http://localhost:5000/movie/all';
        fetch(urlHeroku)
            .then(res => res.json())
            .then(res => this.setState({movies: res.data}))
    }

    setStatus = (key, value) => {
        let status = {...this.state.status};
        //console.log(key, value);
        key.forEach((eachKey, index)=>{
            status[eachKey] = value[index];
        })
        this.setState({
            ...this.state,
            status
        })
    }

    handleAction = (actionName, index) => {
        let isEdit = actionName === 'edit';
        let isShow = this.state.status.isShow;
        let selectedMovie = this.state.movies[index];
        this.setStatus(['isEdit', 'isShow', 'selectedMovie'], [isEdit, !isShow, selectedMovie]);
    }

    handleShow = () => {
        this.setStatus(['isShow'], [!this.state.status.isShow])
    }

    setKeyValue = (key, errorValue, movieValue) => {
        let preErrors = {...this.state.status.errors};
        let preMovies = {...this.state.status.selectedMovie};
        let movieName = this.state.status.selectedMovie.name;
        preErrors[key] = errorValue;
        preMovies[key] = movieValue;
        let isShowSubmitButton = false;
        if ((key ==='name' && movieValue.length !== 0) || movieName.length !== 0) {
            isShowSubmitButton = true
        }
        this.setState({
            ...this.state,
            status: {
                ...this.state.status,
                errors: preErrors,
                selectedMovie: preMovies
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
        console.log(name, value);
        let [keyName, errorStr, keyValue] = this.movieValidation(name, value);
        this.setKeyValue(keyName, errorStr, keyValue);
    }

    updadteMovies = (movie) => {
        let newMovies = this.state.movies;
        newMovies.forEach((item, index)=>{
            if (item._id === this.state.status.selectedMovie._id){
                if (this.state.status.isEdit){
                    newMovies[index] = movie
                } else {
                    newMovies.splice(index, 1)
                }
            }
        })
        //console.log(newMovies);
        this.setState({movies: newMovies});
    }

    handleConfirm = () => {
        let action = this.state.status.isEdit ? 'update' : 'delete';
        let movie_id = this.state.status.selectedMovie._id;
        let action_url = `http://localhost:5000/movie/${action}/${movie_id}`;
        fetch(action_url, {
            headers: {'Content-Type':'application/json'},
            method: this.state.status.isEdit ? 'POST' : 'DELETE',
            body: JSON.stringify(this.state.status.selectedMovie)
        })
            .then(res => res.json())
            .then(res => this.updadteMovies(res.data))
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
                <Modal show={this.state.status.isShow} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b variant="danger">{this.state.status.isEdit ? 'Edit' : 'Delete'}</b> movie
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
                                        <Form.Control type='text' readOnly value={this.state.status.selectedMovie._id}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            {this.state.itemName.map((item)=>{
                                return(
                                    <Form.Group>
                                        <Row>
                                            <Col className='col-2'>
                                                <Form.Label>{item[0].toUpperCase() + item.substr(1,)}</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control 
                                                    type='text' 
                                                    value={this.state.status.selectedMovie[item]}
                                                    readOnly={!this.state.status.isEdit}
                                                    name = {item}
                                                    onChange={this.handleOnChange}
                                                />
                                                {this.state.status.errors[item] ?
                                                    <Form.Control plaintext value={this.state.status.errors[item]}/>
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
                                    <b>{this.state.status.isEdit?'Update':'Delete'}</b>
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
        
        const tableBody = this.state.movies.map((item, index)=>{
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