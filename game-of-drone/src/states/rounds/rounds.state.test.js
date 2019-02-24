import React from 'react';
import { RoundsComponent } from './rounds.state';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import { GameService } from '../../common/services/game.service';
import  router  from '../../App.router';

describe('RoundsComponent', () => {

  let renderer;
  let result;
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement('div');
    props = {users: [{name: 'user one'}, {name: 'user two'}]};
    renderer = new ShallowRenderer();
    renderer.render(<RoundsComponent {...props} />, container);
    result = renderer.getRenderOutput();
  });

  it('should render', () => {
    expect(result).toBeTruthy();
  });

  describe('roundResult()', () => {
    it('should win player one and update', async () => {
      props = {users: [{name: 'user one'}, {name: 'user two'}]};
      act(() => {
        ReactDOM.render(<RoundsComponent {...props} />, container);
      });
  
      const selection = container.querySelector('select');
      const button = container.querySelector('button');
      let updatePromise = Promise.resolve([]);
      
      GameService.prototype.updateUser = jest.fn(() => updatePromise);
  
      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Scissors';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      setTimeout(() => {
        expect(GameService.prototype.updateUser).toHaveBeenCalled();
      },200);
    });

    it('should win player two and update', async () => {
      props = {users: [{name: 'user one'}, {name: 'user two'}]};
      act(() => {
        ReactDOM.render(<RoundsComponent {...props} />, container);
      });
  
      const selection = container.querySelector('select');
      const button = container.querySelector('button');
      let updatePromise = Promise.resolve([]);
      
      GameService.prototype.updateUser = jest.fn(() => updatePromise);
  
      selection.value = 'Scissors';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      setTimeout(() => {
        expect(GameService.prototype.updateUser).toHaveBeenCalled();
      },200);
    });

    it('should be a tie', async () => {
      props = {users: [{name: 'user one'}, {name: 'user two'}]};
      act(() => {
        ReactDOM.render(<RoundsComponent {...props} />, container);
      });
  
      const selection = container.querySelector('select');
      const button = container.querySelector('button');
      let updatePromise = Promise.resolve([]);
      
      GameService.prototype.updateUser = jest.fn(() => updatePromise);
  
      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      setTimeout(() => {
        expect(GameService.prototype.updateUser).not.toHaveBeenCalled();
      },200);
    });

    it('should be a winner', async () => {
      props = {users: [{name: 'user one'}, {name: 'user two'}]};
      act(() => {
        ReactDOM.render(<RoundsComponent {...props} />, container);
      });
  
      const selection = container.querySelector('select');
      const button = container.querySelector('button');
      let updatePromise = Promise.resolve([]);
      
      GameService.prototype.updateUser = jest.fn(() => updatePromise);
      router.stateService.go = jest.fn();
  
      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Scissors';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);

      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Scissors';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);

      selection.value = 'Rock';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);
  
      selection.value = 'Scissors';
      ReactTestUtils.Simulate.change(selection);
      ReactTestUtils.Simulate.click(button);

      setTimeout(() => {
        expect(GameService.prototype.updateUser).toHaveBeenCalled();
        expect(router.stateService.go).toHaveBeenCalled();
      },200);
    });
  });

});
