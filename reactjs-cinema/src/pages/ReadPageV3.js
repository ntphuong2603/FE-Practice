import React from 'react';
import {Table, Button, Row, Col, Modal, Form} from 'react-bootstrap';

class ReadPage extends React.Component{
    constructor(props){
        super(props);
        this.initialState();
        this.handleShow = this.handleShow.bind(this);
        this.handleShowConfirm = this.handleShowConfirm.bind(this);
    }

    initialState = () => {
        this.state = {
            itemName : ['name', 'rating', 'time'],
            movies: [],
            status: {}
        };
    }

    componentDidMount(){
        fetch('http://localhost:5000/movie/all')
            .then(res => res.json())
            .then(res => this.setState({movies: res.data}))
    }

    setStatus = ([key], [value]) => {
        let status = {...this.state.status};
        key.forEach((eachKey, index)=>{
            status[]
        })
        status[key] = value;
        this.setState({
            ...this.state,
            status: {
                ...this.state.status,
                status,
            }
        })
    }

    handleAction = (actionName, index) => {
        let isEdit = true;
        if (actionName === 'remove'){
            isEdit = false;
        }
        let selectedMovie = this.state.movies[index];
        this.setStatus(isEdit, isEdit);
        this.setState(selectedMovie, selectedMovie);
        /*
        this.setState({
            status: {
                isShow: !this.state.status.isShow,
                isEdit: isEdit,
                movie: selectedMovie
            }
        })
        */
    }

    handleShow = () => {
        let isShow = this.state.status.isShow;
        if (isShow === null){
            isShow = false;
        } 
        this.setStatus(isShow, !isShow)
    }

    handleShowConfirm = () => {
        this.setState({
            status: {
                ...this.state.status,
                isShowConfirm: !this.state.status.isShowConfirm
            }
        })
    }

    updadteMovies = (movieId) => {
        let moviesNew = [];
        this.state.movies.forEach(function(item){
            if (item._id !== movieId){
                moviesNew.push(item);
            }
        })
        console.log(moviesNew);
        this.setState({movies: moviesNew});
    }

    handleConfirm = () => {
        let action = this.state.status.isEdit ? 'update' : 'delete';
        let movie_id = this.state.status.movie._id;
        let action_url = `http://localhost:5000/movie/${action}/${movie_id}`;
        fetch(action_url, {
            headers: {'Content-Type':'application/json'},
            method: this.state.status.isEdit ? 'POST' : 'DELETE'
        })
            .then(res => res.json())
            .then(res => this.updadteMovies(res.data._id))
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
                                        <Form.Control type='label' value={this.state.status.movie._id}/>
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
                                                <Form.Control type='text' value={this.state.status.movie[item]}/>
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
                                <Button block variant="danger" onClick={this.handleConfirm}>Confirm</Button>
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
                    {ActionModal}
                </tbody>
            </Table>
        )
    }
}

export default ReadPage;