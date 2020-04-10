import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import BookPage from './pages/BookPage';
import GenrePage from './pages/GenrePage';
import NavBar from './components/NavBar';

function App() {
  const menuBar = ['Book', 'Author', 'Genre', 'Book-Instance'];
  return (
    <Container>
      <Row>
        <Col className="col-sm-3">
          <h2> Menu bar </h2>
          <NavBar menuBar={menuBar}/>
        </Col>
        <Col className="col-sm-9">
          <h2> Contain area </h2>
          <BookPage url='http://localhost:5000/bookApi/list'/>
          <GenrePage url='http://localhost:5000/genreApi/list'/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
