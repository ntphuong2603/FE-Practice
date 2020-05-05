import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePage, ReadPage, UpdateDeletePage} from './pages/IndexPages';

function App() {
  return (
    <Container style={{paddingTop: 30}}>
      <HashRouter>
        <Row>
          <Col className="col-3">
            <MenuBar/>
          </Col>
          <Col className="col-9">
            <Route exact path='/read' component={()=><ReadPage headers={['No.', 'Movie', 'Rating', 'Select']} />}/>
            <Route path='/create' component={()=> <CreatePage items={['name', 'rating', 'time']}/>}/>
            {/*
            <Route path='/update - delete' component={UpdateDeletePage}/>
            */}
          </Col>
        </Row>
      </HashRouter>
    </Container>
  );
}

export default App;
