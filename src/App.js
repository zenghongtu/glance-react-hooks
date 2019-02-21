import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import StateHook from "./components/StateHook";
import EffectHook from "./components/EffectHook";
import CustomHook from "./components/CustomHook";

class App extends Component {
  render() {
    return (
      <div className="App">
        <StateHook/>
        <EffectHook/>
        <CustomHook/>
      </div>
    );
  }
}

export default App;
