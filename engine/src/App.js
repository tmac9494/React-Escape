import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Test from './App/Components/Test';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    document.title = 'React Escape';
  }

  render() {
    const App = () => (
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Test}/>
          </Switch>
        </main>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
