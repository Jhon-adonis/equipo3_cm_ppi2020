import React, { Component } from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import Navbar from '../components/Navbar.jsx';

import './Factura.css';
import './Factura2.css'


class App extends Component {
  state = {
    characters: []
  };

  removeCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      })
    });
  };

  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  render() {
    const { characters } = this.state;

    return (
      
 
      <div className="container">
      <div> <Navbar/>
   

<nav class="navbar navbar-light bg-light">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
        
        <h1 className="b pl2 flex-auto ">Crear Factura</h1>
        
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />
        
        <h3>Nuevo producto</h3>
        <Form handleSubmit={this.handleSubmit} />
      </div>
</div>
    );
  }
}

export default App;
