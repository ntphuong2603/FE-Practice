import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePage, ReadPage, UpdatePage, DeletePage} from './pages/index';
import CreatePageV2 from './pages/CreatePageV2'

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
            {/* Previous version
            <Route path='/create' component={CreatePage}/>
            */}
            {/* V1.5 adjust the props of CreatePage component */}
            <Route path='/create' component={() => <CreatePageV2 members={['name', 'rating', 'time']}/>}/>
            <Route path='/update' component={UpdatePage}/>
            <Route path='/delete' component={DeletePage}/>
          </Col>
        </Row>
      </HashRouter>
    </Container>
  );
}

export default App;
