import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './components/TreeView';
import treeStore from './stores/TreeStore';
import {observer, Provider} from 'mobx-react'


class App extends Component {
  
  render() {

    return (
      <div className="App">

        <TreeView />
      
      </div>
    );
  }
}

export default App;
