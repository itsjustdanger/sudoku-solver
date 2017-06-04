import React from 'react';
import SudokuContainer from '../SudokuContainer.js';
import {shallow} from 'enzyme';

const wrapper = shallow(<SudokuContainer />);

it('should render one <Sudoku />', () => {

  expect(wrapper.find('Sudoku').length).toBe(1);
});

it('should initialize board with 81 coord mapped squares');
it('should handle square input changes');
it('should should return true if board is solved on solve');
it('should return false and set note if board unsolvable on solve');
it('should solve board if solvable on solve');
it('should successfully perform eliminate strategy');
it('should successfully perform onlyChoice strategy');
it('should successfully reduce elimination strategies');
it('should loop through elimination strategies until stalled');
it('should return false if board is invalid on reduce');
it('should reduce elimination strategies on search');
it('should return false for invalid board on search');
it('should return solved board if board solved on search');
it('should create a search tree and search for solution on search');
it('should return true for solved board on _checkSolved');
it('should return false for unsolved board on _checkSolved');
it('should return array of solved squares on _getSolvedBoxes');
it('should return true for invalid board on _boardInvalid');
it('should return false for valid board on _boardInvalid');
it('should generate a solution board on _createSolutionBoard');
