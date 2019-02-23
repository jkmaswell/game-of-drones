import React, { Component } from 'react';
import { UIRouter, UIView } from '@uirouter/react';
import router  from './App.router';
import './App.css';

class App extends Component {
  render() {
    return (
      <UIRouter router={router}>
        <div className="content">
          <UIView />
        </div>
      </UIRouter>
    );
  }
}

export default App;
