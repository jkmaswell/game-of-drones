import React, { Component } from 'react';
import './winner.state.css';
import  router  from '../../App.router';

export class WinnerComponent extends Component {

  constructor() {
    super();
    this.state = {
      winner: ''
    }
  }

  componentWillMount() {
    this.setState({
      winner: this.props.winner
    });
  }

  goToHome = () => {
    router.stateService.go('home');
  }

  render() {
    return (
      <section>
        <div className="winner">
          <h1>We have a winner</h1>
          <span className="disc"><span className="winner-name">{this.state.winner}</span> is the new EMPEROR!</span>
          <button id="go-home" type="button" onClick={this.goToHome}>Play again</button>
        </div>
      </section>
    );
  }
}
