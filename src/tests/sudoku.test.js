import React from 'react';
import Sudoku from '../Sudoku.js';
import {shallow} from 'enzyme';

const board = {
  'A1': '1',
  'A2': '2',
  'A3': '3',
};

const wrapper = shallow(
  <Sudoku
    board={board}
    handleChange={jest.fn()}
    solve={jest.fn()}
    unsolvable={false} />);

it('should render one <SudokuBoard />', () => {

  expect(wrapper.find('SudokuBoard').length).toBe(1);
});


it('should render \'unsolvable\' message based on props', () => {

  wrapper.setProps({unsolvable: false});
  expect(wrapper.find('.unsolvable').length).toBe(0);

  wrapper.setProps({unsolvable: true});
  expect(wrapper.find('.unsolvable').length).toBe(1);
})
