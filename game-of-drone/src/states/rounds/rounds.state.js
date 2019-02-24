import React, { Component } from 'react';
import './rounds.state.css';
import { GameService } from '../../common/services/game.service';
import  router  from '../../App.router';

export class RoundsComponent extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
      rounds: 1,
      movements: 0,
      firstMove: '',
      secondMove: '',
      selectValue: '',
      userOneWins: 0,
      userTwoWins: 0,
      stats: []
    }
    this.gameService = new GameService();
  }

  componentWillMount() {
    this.setState({
      users: this.props.users
    });
  }

  isOdd = num => {return num % 2;}

  handleChange = (event) => {
    const value = event.target.value;
    this.setState((prev) => {
      return Object.assign(prev, {
        selectValue: value
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const movements = this.state.movements + 1;
    let {firstMove, secondMove} = '';

    if (this.isOdd(movements)) {
      firstMove = this.state.selectValue;
      this.setState((prev) => {
        return Object.assign(prev, {
          movements: movements,
          firstMove: firstMove,
          selectValue: ''
        });
      });
    } else {
      secondMove = this.state.selectValue;
      this.setState((prev) => {
        return Object.assign(prev, {
          movements: movements,
          secondMove: secondMove,
          selectValue: ''
        });
      }, this.roundResult);
    }
  }

  roundResult = () => {
    const firstMove = this.state.firstMove;
    const secondMove = this.state.secondMove;

    if (firstMove === secondMove) {
      const roundStats = {round: this.state.rounds, winner: 'Tied'};
      const stats = this.state.stats;
      stats.push(roundStats);

      this.setState((prev) => {
        return Object.assign(prev, {
          movements: 0,
          firstMove: '',
          secondMove: '',
          selectValue: '',
          stats: stats
        });
      });
    } else if (
      (firstMove === 'Rock' && secondMove === 'Scissors') ||
      (firstMove === 'Scissors' && secondMove === 'Paper') ||
      (firstMove === 'Paper' && secondMove === 'Rock')
    ) {
      const userOne = Object.assign(this.state.users[0], {wins: this.state.users[0].wins + 1});
      const roundStats = {round: this.state.rounds, winner: this.state.users[0].name};
      const stats = this.state.stats;
      stats.push(roundStats);

      this.gameService.updateUser(this.state.users[0]).then(() => {
        this.setState((prev) => {
          return Object.assign(prev, {
            users: [userOne, this.state.users[1]],
            movements: 0,
            firstMove: '',
            secondMove: '',
            rounds: this.state.rounds + 1,
            selectValue: '',
            userOneWins: this.state.userOneWins + 1,
            stats: stats
          });
        }, () => {
          if (this.state.userOneWins === 3) {
            router.stateService.go('winner', {name: this.state.users[0].name});
          }
        });
      });
    } else {
      const userTwo = Object.assign(this.state.users[1], {wins: this.state.users[1].wins + 1});
      const roundStats = {round: this.state.rounds, winner: this.state.users[1].name};
      const stats = this.state.stats;
      stats.push(roundStats);
      
      this.gameService.updateUser(this.state.users[1]).then(() => {
        this.setState((prev) => {
          return Object.assign(prev, {
            users: [this.state.users[0], userTwo],
            movements: 0,
            firstMove: '',
            secondMove: '',
            rounds: this.state.rounds + 1, 
            selectValue: '',
            userTwoWins: this.state.userTwoWins + 1,
            stats: stats
          });
        }, () => {
          if (this.state.userTwoWins === 3) {
            router.stateService.go('winner', {name: this.state.users[1].name});
          }
        });
      });
    }
  }

  render() {
    return (
      <main>
        <div className="rounds">
          <section>
            <div className="form">
              <h1>Round {this.state.rounds}</h1>
              <span className="username">
                {!this.isOdd(this.state.movements) ? this.state.users[0].name : this.state.users[1].name}
              </span>
              <div className="moves">
                <span className="disc">Select move:</span>
                <select value={this.state.selectValue} onChange={this.handleChange}>
                  <option disabled value="">Select an option</option>
                  <option value="Rock">Rock</option>
                  <option value="Paper">Paper</option>
                  <option value="Scissors">Scissors</option>
                </select>
              </div>
              <button className="next" onClick={this.handleSubmit} disabled={this.state.selectValue.length === 0}>Ok</button>
            </div>
          </section>
          <section>
            <div className="stats">
              <div className="stat">
                <span className="item header">Round</span>
                <span className="item header">Winner</span>
              </div>
              {this.state.stats.map((stat, index) => {
                return (
                  <div className="stat" key={index}>
                    <span className="item">{stat.round}</span>
                    <span className="item">{stat.winner}</span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
    );
  }
}
