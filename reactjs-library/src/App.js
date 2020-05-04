import React from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Contents from './components/Content';
import Footer from './components/Footer';

function App() {
  const menu = ['Home page', 'Book', 'Author', 'Genre', 'Book-Instance', 'About'];
  return (
    <div>
      <Header/>
      <MenuBar menu = {menu}/>
      <Contents/>
      <Footer/>
    </div>
  );
}

export default App;
