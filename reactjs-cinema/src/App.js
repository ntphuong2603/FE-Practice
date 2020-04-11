import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePage, ReadPage} from './pages/index';

function App() {
  return (
    <Container>
      <Row>
        <Col className="col-3">
          <h1> Menu area </h1>
          <MenuBar/>
        </Col>
        <Col className="col-9">
          <h1>Contain area</h1>
          <ReadPage headers={['No.', 'Movie', 'Rating', 'Select']}/>
          <CreatePage/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
