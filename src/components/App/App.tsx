import { Component } from 'react';

import '../../assets/styles/main.css';
import './App.css';

class App extends Component {
  public test = 'Hello world';

  render() {
    return (
      <div className="parent">
        <div className="child">Привет</div>
        <h1 className="text-3xl font-bold underline">{this.test}</h1>
      </div>
    );
  }
}
export default App;
