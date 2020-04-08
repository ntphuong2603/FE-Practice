import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Container>
      <Row>
        <Col className="col-sm-3">
          <h2> Menu bar </h2>
        </Col>
        <Col className="col-sm-9">
          <h2> Contain area </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
