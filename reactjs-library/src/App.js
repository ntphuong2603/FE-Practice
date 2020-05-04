import React from 'react';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Contents from './components/Content';
import Footer from './components/Footer';

export default class App extends React.Component {
  constructor(props){
    super(props);
    const menus = ['Home page', 'Book', 'Author', 'Genre', 'Book-Instance'];
    this.state = {
      menus: menus,
      activeMenu: menus[0]
    }
    this.handleActive = this.handleActive.bind(this)
  }

  handleActive(menuName){
    this.setState({activeMenu: menuName})
    //alert(menuName);
  }

  componentDidUpdate(){
    //alert(this.state.activeMenu);
    const selectedMenu = this.state.activeMenu;
    this.setState({activeMenu: selectedMenu})
  }

  render(){
    return (
      <div>
        <Header/>
        <MenuBar menus={this.state.menus} func={this.handleActive}/>
        <Contents/>
        <Footer/>
      </div>
    );
  }
}

