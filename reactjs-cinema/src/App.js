import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePage, ReadPage, UpdatePage, DeletePage} from './pages/index';

function App() {
  return (
    <Container>
      <HashRouter>
        <Row>
          <Col className="col-3">
            <h1> Menu area </h1>
            <MenuBar/>
          </Col>
          <Col className="col-9">
            <Route exact path='/read' component={()=><ReadPage headers={['No.', 'Movie', 'Rating', 'Select']} />}/>
            <Route path='/create' component={CreatePage}/>
            <Route path='/update' component={UpdatePage}/>
            <Route path='/delete' component={DeletePage}/>
          </Col>
        </Row>
      </HashRouter>
    </Container>
  );
}

export default App;
