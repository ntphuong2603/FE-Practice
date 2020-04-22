import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/MenuBar';
import {CreatePageV3, ReadPage, ReadPageV3, UpdatePage, DeletePage} from './pages/index';
//import CreatePageV2 from './pages/CreatePageV2';
//import CreatePageV3 from './pages/CreatePageV3';

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
            {/* Previous version
            <Route path='/create' component={CreatePage}/>
            Version 2.0 adjust the props of CreatePage component 
            <Route path='/create' component={() => <CreatePageV2 members={['name', 'rating', 'time']}/>}/>
            */}
            {/* Version 3.0 */}
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
