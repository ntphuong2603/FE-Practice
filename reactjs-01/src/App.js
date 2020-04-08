import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import BookPage from './pages/BookPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Container>
      <Row>
        <Col className="col-sm-3">
          <h2> Menu bar </h2>
          <NavBar/>
        </Col>
        <Col className="col-sm-9">
          <h2> Contain area </h2>
          <BookPage/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
