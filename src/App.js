import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import StateHook from "./components/StateHook";
import EffectHook from "./components/EffectHook";

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateHook/>
        <EffectHook/>
      </div>
    );
  }
}

export default App;
