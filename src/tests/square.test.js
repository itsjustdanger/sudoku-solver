import React from 'react';
import Square from '../Square.js';
import {shallow} from 'enzyme';

it('renders input with expected value', () => {
  const wrapper = shallow(
    <Square
      handleChange={jest.fn()}
      value={'1'} />);

  expect(wrapper.html())
    .toBe('<input type="text" class="square" maxlength="1" value="1"/>');
});
