import React, { Component } from 'react';
import './home.state.css';
import  router  from '../../App.router';
import { GameService } from '../../common/services/game.service';

export class HomeComponent extends Component {

  constructor() {
    super();
    this.state = {
      userOne: {
        value: '',
        valid: false
      },
      userTwo: {
        value: '',
        valid: false
      },
      formValid: false
    }
    this.gameService = new GameService();
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: {
        value: value
      }
    }, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let userOneValid = this.state.userOne.valid;
    let userTwoValid = this.state.userTwo.valid;
  
    switch(fieldName) {
      case 'userOne':
        userOneValid = value.length > 0;
        break;
      case 'userTwo':
        userTwoValid = value.length > 0;
        break;
      default:
        break;
    }

    this.setState({
      userOne: {
        value: this.state.userOne.value,
        valid: userOneValid
      },
      userTwo: {
        value: this.state.userTwo.value,
        valid: userTwoValid
      }
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({formValid: this.state.userOne.valid && this.state.userTwo.valid});
  }

  submitHandler = event => {
    event.preventDefault();
    let users = [];
    this.gameService.getUsers().then(res => {
      const userOne = {
        name: this.state.userOne.value.toLowerCase(),
        wins: 0
      }
      const userTwo = {
        name: this.state.userTwo.value.toLowerCase(),
        wins: 0
      }

      users = res.filter(user => {
        return user.name === userOne.name || user.name === userTwo.name
      });

      if (users.length === 0) {
        this.gameService.createUsers([userOne, userTwo]).then(() => {
          this.goToRounds(userOne.name, userTwo.name);
        });
      } else if (users.length === 1 && users[0].name === userOne.name) {
        this.gameService.createUsers([userTwo]).then(() => {
          this.goToRounds(userOne.name, userTwo.name);
        });
      } else if (users.length === 1 && users[0].name === userTwo.name) {
        this.gameService.createUsers([userOne]).then(() => {
          this.goToRounds(userOne.name, userTwo.name);
        });
      } else {
        this.goToRounds(userOne.name, userTwo.name);
      }
    });
  }

  goToRounds = (userOne, userTwo) => {
    router.stateService.go('rounds', {userOne: userOne, userTwo: userTwo});
  }

  render() {
    return (
      <div className="home">
        <h1>Enter player's names</h1>
        <form className="players" onSubmit={this.submitHandler} noValidate>
          <label>
            Player 1:
            <input id="userOne" name="userOne" type="text" onChange={this.changeHandler} />
          </label>
          <label>
            Player 2:
            <input id="userTwo" name="userTwo" type="text" onChange={this.changeHandler} />
          </label>
          <button id="submit" type="submit" disabled={!this.state.formValid}>Start</button>
        </form>
      </div>
    );
  }
}
