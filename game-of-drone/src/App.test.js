import React from 'react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

it('can render', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
});