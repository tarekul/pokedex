import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom'
import StatView from './components/StatView';
import Search from './components/Search'
import Pokelist from './components/Pokelist'

import axios from 'axios'

import './App.css';
const { pokemons } = require('./pkmn-list')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }

  }

  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
      .then(response => {
        if (localStorage.getItem('currentPage') === null) {
          this.setState({
            offset: 0, currentPokemon: localStorage.getItem('currentPokemon'),
            currentPage: 'list',
            results: response.data.results
          })
        }
        else {
          //const updatedResults = results.concat(response.data.results)
          this.setState({
            offset: 0, currentPokemon: localStorage.getItem('currentPokemon'),
            currentPage: localStorage.getItem('currentPage'),
            results: response.data.results
          })
        }
      })
  }

  

  toList = () => {
    localStorage.setItem('currentPage', 'list');
    this.setState({ currentPage: 'list' });
  }

  changeState = (obj) => {
    this.setState(obj, () => console.log(this.state))
  }

  //METHOD THAT HANDLES Pokelist ON CLICK TO SWAP STATE.CURRENTPAGE TO STAT and SEND POKEMON NAME TO STATE

  View = () => {
    if (this.state.currentPage === 'list') {
      localStorage.setItem('currentPokemon', this.state.currentPokemon);
      return <>
        <Route path='/' exact render={()=><Pokelist results={this.state.results} changeState={this.changeState} offset={this.state.offset} />} />
      </>
    }
    else {
      if (this.state.currentPage === 'stat') {
        localStorage.setItem('currentPokemon', this.state.currentPokemon);
        localStorage.setItem('currentPage', 'stat');
      }
      return <>
        <Route path='/' exact render={()=><StatView toList={this.toList} pokemon={this.state.currentPokemon} />} />
      </>
    }
  }



  render() {
    return (
      <>
      <HashRouter>
        <Route path='/' render={()=> <Search pokemons={pokemons} changeState={this.changeState} /> } />
        <this.View />
      </HashRouter>
      </>
    )
  }
}



export default App
