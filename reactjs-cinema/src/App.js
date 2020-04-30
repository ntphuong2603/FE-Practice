import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePageV3, ReadPageV3, UpdatePage, DeletePage} from './pages/index';

function App() {
  return (
    <Container style={{paddingTop: 30}}>
      <HashRouter>
        <Row>
          <Col className="col-3">
            <MenuBar/>
          </Col>
          <Col className="col-9">
            <Route exact path='/read' component={()=><ReadPageV3 headers={['No.', 'Movie', 'Rating', 'Select']} />}/>
            <Route path='/create' component={()=> <CreatePageV3 items={['name', 'rating', 'time']}/>}/>
            <Route path='/update' component={UpdatePage}/>
            <Route path='/delete' component={DeletePage}/>
          </Col>
        </Row>
      </HashRouter>
    </Container>
  );
}

export default App;
