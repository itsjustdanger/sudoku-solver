import React from 'react';
import SudokuBoard from '../SudokuBoard';
import {shallow} from 'enzyme';

const board = {
  'A1': '1',
  'A2': '2',
  'A3': '3',
};

const wrapper = shallow(
  <SudokuBoard
  board={board}
  handleChange={jest.fn()} />);

it('should render <Square /> for each element in board', () => {

  expect(wrapper.find('Square').length).toBe(3);
});
