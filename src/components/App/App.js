import React, { Component } from "react";

import './App.css';
import '../../assets/styles/main.css'
class App extends Component {
  render() {
    return (
        <div className='parent'>
          <div className='child'>
              Привет
          </div>
            <h1 className="text-3xl font-bold underline">
                Hello world
            </h1>
        </div>
    );
  }
}
export default App;
