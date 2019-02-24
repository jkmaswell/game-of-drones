import React from 'react';
import { WinnerComponent } from './winner.state';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import  router  from '../../App.router';

describe('WinnerComponent', () => {

  let renderer;
  let result;
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement('div');
    props = {winner: 'user one'};
    renderer = new ShallowRenderer();
    renderer.render(<WinnerComponent {...props} />, container);
    result = renderer.getRenderOutput();
  });

  it('should render', () => {
    expect(result).toBeTruthy();
  });

  describe('goToHome()', () => {
    it('should go home', async () => {
      props = {winner: 'user one'};
      act(() => {
        ReactDOM.render(<WinnerComponent {...props} />, container);
      });
      const button = container.querySelector('#go-home');

      router.stateService.go = jest.fn();
      ReactTestUtils.Simulate.click(button);
  
      expect(router.stateService.go).toHaveBeenCalled();
    });
  });
});
