import React from 'react';
import logo from './logo.svg';
import './App.css';
const { name } = require('../package.json')

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>我是子应用{name}</div>
      </header>
    </div>
  );
}

export default App;
