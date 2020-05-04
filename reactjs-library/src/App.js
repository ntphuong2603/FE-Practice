import React from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Contents from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header/>
      <MenuBar/>
      <Contents/>
      <Footer/>
    </div>
  );
}

export default App;
