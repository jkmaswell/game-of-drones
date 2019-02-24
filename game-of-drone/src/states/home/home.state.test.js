import React from 'react';
import { HomeComponent } from './home.state';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import { GameService } from '../../common/services/game.service';

describe('HomeComponent', () => {

  let renderer;
  let result;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    renderer = new ShallowRenderer();
    renderer.render(<HomeComponent />, container);
    result = renderer.getRenderOutput();
  });

  it('should render', () => {
    expect(result).toBeTruthy();
  });

  describe('Create Users', () => {
    it('should create users', async () => {
      act(() => {
        ReactDOM.render(<HomeComponent />, container);
      });
  
      let usersPromise = Promise.resolve([{name:'user 1'}, {name:'user 2'}]);
      let createPromise = Promise.resolve([]);
  
      const userOne = container.querySelector('#userOne');
      const userTwo = container.querySelector('#userTwo');
      const form = container.querySelector('form');
  
      GameService.prototype.getUsers = jest.fn(() => usersPromise);
      GameService.prototype.createUsers = jest.fn(() => createPromise);
      
      userOne.value = 'user one';
      userTwo.value = 'user two';
      ReactTestUtils.Simulate.change(userOne);
      ReactTestUtils.Simulate.change(userTwo);
      ReactTestUtils.Simulate.submit(form);
  
      setTimeout(() => {
        expect(GameService.prototype.getUsers).toHaveBeenCalled();
        expect(GameService.prototype.createUsers).toHaveBeenCalled();
      },200);
    });
  
    it('should create user two', async () => {
      act(() => {
        ReactDOM.render(<HomeComponent />, container);
      });
  
      let usersPromise = Promise.resolve([{name:'user one'}, {name:'user 2'}]);
      let createPromise = Promise.resolve([]);
  
      const userOne = container.querySelector('#userOne');
      const userTwo = container.querySelector('#userTwo');
      const form = container.querySelector('form');
  
      GameService.prototype.getUsers = jest.fn(() => usersPromise);
      GameService.prototype.createUsers = jest.fn(() => createPromise);
      
      userOne.value = 'user one';
      userTwo.value = 'user two';
      ReactTestUtils.Simulate.change(userOne);
      ReactTestUtils.Simulate.change(userTwo);
      ReactTestUtils.Simulate.submit(form);
  
      setTimeout(() => {
        expect(GameService.prototype.getUsers).toHaveBeenCalled();
        expect(GameService.prototype.createUsers).toHaveBeenCalled();
      },200);
    });
  
    it('should create user one', async () => {
      act(() => {
        ReactDOM.render(<HomeComponent />, container);
      });
  
      let usersPromise = Promise.resolve([{name:'user 1'}, {name:'user two'}]);
      let createPromise = Promise.resolve([]);
  
      const userOne = container.querySelector('#userOne');
      const userTwo = container.querySelector('#userTwo');
      const form = container.querySelector('form');
  
      GameService.prototype.getUsers = jest.fn(() => usersPromise);
      GameService.prototype.createUsers = jest.fn(() => createPromise);
      
      userOne.value = 'user one';
      userTwo.value = 'user two';
      ReactTestUtils.Simulate.change(userOne);
      ReactTestUtils.Simulate.change(userTwo);
      ReactTestUtils.Simulate.submit(form);
  
      setTimeout(() => {
        expect(GameService.prototype.getUsers).toHaveBeenCalled();
        expect(GameService.prototype.createUsers).toHaveBeenCalled();
      },200);
    });
  
    it('should not create users', async () => {
      act(() => {
        ReactDOM.render(<HomeComponent />, container);
      });
  
      let usersPromise = Promise.resolve([{name:'user one'}, {name:'user two'}]);
      let createPromise = Promise.resolve([]);
  
      const userOne = container.querySelector('#userOne');
      const userTwo = container.querySelector('#userTwo');
      const form = container.querySelector('form');
  
      GameService.prototype.getUsers = jest.fn(() => usersPromise);
      GameService.prototype.createUsers = jest.fn(() => createPromise);
      
      userOne.value = 'user one';
      userTwo.value = 'user two';
      ReactTestUtils.Simulate.change(userOne);
      ReactTestUtils.Simulate.change(userTwo);
      ReactTestUtils.Simulate.submit(form);
  
      setTimeout(() => {
        expect(GameService.prototype.getUsers).toHaveBeenCalled();
        expect(GameService.prototype.createUsers).not.toHaveBeenCalled();
      },200);
    });
  });
});
