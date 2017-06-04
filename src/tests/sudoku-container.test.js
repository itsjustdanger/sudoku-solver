import React from 'react';
import SudokuContainer from '../SudokuContainer.js';
import {shallow} from 'enzyme';

const unsolvedBoard = { A1: "4", A2: "", A3: "", A4: "", A5: "3", A6: "2", A7:
"", A8: "", A9: "7", B1: "8", B2: "3", B3: "", B4: "7", B5: "", B6: "6", B7:
"", B8: "9", B9: "", C1: "", C2: "", C3: "7", C4: "", C5: "", C6: "", C7: "3",
C8: "", C9: "1", D1: "", D2: "8", D3: "", D4: "3", D5: "", D6: "4", D7: "2",
D8: "", D9: "", E1: "", E2: "", E3: "", E4: "2", E5: "9", E6: "8", E7: "", E8:
"", E9: "", F1: "", F2: "", F3: "5", F4: "1", F5: "", F6: "7", F7: "", F8:
"3", F9: "", G1: "5", G2: "", G3: "4", G4: "", G5: "", G6: "", G7: "7", G8:
"", G9: "", H1: "", H2: "9", H3: "", H4: "6", H5: "", H6: "3", H7: "", H8:
"5", H9: "2", I1: "7", I2: "", I3: "", I4: "4", I5: "2", I6: "", I7: "", I8:
"", I9: "8"};

const unsolvedSolutionBoard =  {"A1": "4", "A2": "123456789", "A3":
"123456789", "A4": "123456789", "A5": "3", "A6": "2", "A7": "123456789", "A8":
"123456789", "A9": "7", "B1": "8", "B2": "3", "B3": "123456789", "B4": "7",
"B5": "123456789", "B6": "6", "B7": "123456789", "B8": "9", "B9": "123456789",
"C1": "123456789", "C2": "123456789", "C3": "7", "C4": "123456789", "C5":
"123456789", "C6": "123456789", "C7": "3", "C8": "123456789", "C9": "1", "D1":
"123456789", "D2": "8", "D3": "123456789", "D4": "3", "D5": "123456789", "D6":
"4", "D7": "2", "D8": "123456789", "D9": "123456789", "E1": "123456789", "E2":
"123456789", "E3": "123456789", "E4": "2", "E5": "9", "E6": "8", "E7":
"123456789", "E8": "123456789", "E9": "123456789", "F1": "123456789", "F2":
"123456789", "F3": "5", "F4": "1", "F5": "123456789", "F6": "7", "F7":
"123456789", "F8": "3", "F9": "123456789", "G1": "5", "G2": "123456789", "G3":
"4", "G4": "123456789", "G5": "123456789", "G6": "123456789", "G7": "7", "G8":
"123456789", "G9": "123456789", "H1": "123456789", "H2": "9", "H3":
"123456789", "H4": "6", "H5": "123456789", "H6": "3", "H7": "123456789", "H8":
"5", "H9": "2", "I1": "7", "I2": "123456789", "I3": "123456789", "I4": "4",
"I5": "2", "I6": "123456789", "I7": "123456789", "I8": "123456789", "I9": "8"}

const unsolvableBoard = { A1: "4", A2: "4", A3: "", A4: "", A5: "3", A6: "2",
A7: "", A8: "", A9: "7", B1: "8", B2: "3", B3: "", B4: "7", B5: "", B6: "6",
B7: "", B8: "9", B9: "", C1: "", C2: "", C3: "7", C4: "", C5: "", C6: "", C7:
"3", C8: "", C9: "1", D1: "", D2: "8", D3: "", D4: "3", D5: "", D6: "4", D7:
"2", D8: "", D9: "", E1: "", E2: "", E3: "", E4: "2", E5: "9", E6: "8", E7:
"", E8: "", E9: "", F1: "", F2: "", F3: "5", F4: "1", F5: "", F6: "7", F7: "",
F8: "3", F9: "", G1: "5", G2: "", G3: "4", G4: "", G5: "", G6: "", G7: "7",
G8: "", G9: "", H1: "", H2: "9", H3: "", H4: "6", H5: "", H6: "3", H7: "", H8:
"5", H9: "2", I1: "7", I2: "", I3: "", I4: "4", I5: "2", I6: "", I7: "", I8:
"", I9: "8"};

const solvedBoard = { A1: "4", A2: "1", A3: "9", A4: "5", A5: "3", A6: "2",
A7: "6", A8: "8", A9: "7", B1: "8", B2: "3", B3: "2", B4: "7", B5: "1", B6:
"6", B7: "5", B8: "9", B9: "4", C1: "6", C2: "5", C3: "7", C4: "8", C5: "4",
C6: "9", C7: "3", C8: "2", C9: "1", D1: "9", D2: "8", D3: "1", D4: "3", D5:
"5", D6: "4", D7: "2", D8: "7", D9: "6", E1: "3", E2: "7", E3: "6", E4: "2",
E5: "9", E6: "8", E7: "1", E8: "4", E9: "5", F1: "2", F2: "4", F3: "5", F4:
"1", F5: "6", F6: "7", F7: "8", F8: "3", F9: "9", G1: "5", G2: "2", G3: "4",
G4: "9", G5: "8", G6: "1", G7: "7", G8: "6", G9: "3", H1: "1", H2: "9", H3:
"8", H4: "6", H5: "7", H6: "3", H7: "4", H8: "5", H9: "2", I1: "7", I2: "6",
I3: "3", I4: "4", I5: "2", I6: "5", I7: "9", I8: "1", I9: "8"};

const eliminatedBoard = {"A1": "4", "A2": "156", "A3": "169", "A4": "589",
 "A5": "3", "A6": "2", "A7": "568", "A8": "68", "A9": "7", "B1": "8", "B2":
 "3", "B3": "12", "B4": "7", "B5": "145", "B6": "6", "B7": "45", "B8": "9",
 "B9": "45", "C1": "269", "C2": "256", "C3": "7", "C4": "589", "C5": "458",
 "C6": "59", "C7": "3", "C8": "2468", "C9": "1", "D1": "169", "D2": "8", "D3":
 "169", "D4": "3", "D5": "56", "D6": "4", "D7": "2", "D8": "167", "D9": "569",
 "E1": "136", "E2": "1467", "E3": "136", "E4": "2", "E5": "9", "E6": "8",
 "E7": "1456", "E8": "1467", "E9": "456", "F1": "269", "F2": "246", "F3": "5",
 "F4": "1", "F5": "6", "F6": "7", "F7": "4689", "F8": "3", "F9": "469", "G1":
 "5", "G2": "126", "G3": "4", "G4": "89", "G5": "18", "G6": "19", "G7": "7",
 "G8": "16", "G9": "369", "H1": "1", "H2": "9", "H3": "18", "H4": "6", "H5":
 "178", "H6": "3", "H7": "14", "H8": "5", "H9": "2", "I1": "7", "I2": "16",
 "I3": "136", "I4": "4", "I5": "2", "I6": "159", "I7": "169", "I8": "16",
 "I9": "8"};

const onlyChoicedBoard = {"A1": "4", "A2": "123456789", "A3": "123456789",
"A4": "123456789", "A5": "3", "A6": "2", "A7": "123456789", "A8": "123456789",
"A9": "7", "B1": "8", "B2": "3", "B3": "123456789", "B4": "7", "B5":
"123456789", "B6": "6", "B7": "123456789", "B8": "9", "B9": "123456789", "C1":
"123456789", "C2": "123456789", "C3": "7", "C4": "123456789", "C5":
"123456789", "C6": "123456789", "C7": "3", "C8": "123456789", "C9": "1", "D1":
"123456789", "D2": "8", "D3": "123456789", "D4": "3", "D5": "123456789", "D6":
"4", "D7": "2", "D8": "123456789", "D9": "123456789", "E1": "123456789", "E2":
"123456789", "E3": "123456789", "E4": "2", "E5": "9", "E6": "8", "E7":
"123456789", "E8": "123456789", "E9": "123456789", "F1": "123456789", "F2":
"123456789", "F3": "5", "F4": "1", "F5": "123456789", "F6": "7", "F7":
"123456789", "F8": "3", "F9": "123456789", "G1": "5", "G2": "123456789", "G3":
"4", "G4": "123456789", "G5": "123456789", "G6": "123456789", "G7": "7", "G8":
"123456789", "G9": "123456789", "H1": "123456789", "H2": "9", "H3":
"123456789", "H4": "6", "H5": "123456789", "H6": "3", "H7": "123456789", "H8":
"5", "H9": "2", "I1": "7", "I2": "123456789", "I3": "123456789", "I4": "4",
"I5": "2", "I6": "123456789", "I7": "123456789", "I8": "123456789", "I9": "8"};

const wrapper = shallow(<SudokuContainer />);

it('should render one <Sudoku />', () => {

  expect(wrapper.find('Sudoku').length).toBe(1);
});


it('should initialize board with 81 coord mapped squares', () => {

  expect(Object.keys(wrapper.state('board')).length).toBe(81);
});


it('should handle square input changes', () => {
  wrapper.instance().handleChange('A1', {target: {value: 3}});

  expect(wrapper.state('board')['A1']).toBe(3);
});


it('should return true if board is solved on solve', () => {
  const board = Object.assign({}, unsolvedBoard);
  wrapper.setState({board});

  const solve = wrapper.instance().solve();

  expect(solve).toBe(true);
});


it('should return false if board unsolvable on solve', () => {
  wrapper.setState({board: unsolvableBoard});
  const solve = wrapper.instance().solve();

  expect(solve).toBe(false);
});


it('should set unsolvable if board is unsolvable on solve', () => {
  wrapper.setState({board: unsolvableBoard});
  wrapper.instance().solve();

  expect(wrapper.state('unsolvable')).toBe(true);
});


it('should solve board if solvable on solve', () => {
  wrapper.setState({board: unsolvedBoard});
  wrapper.instance().solve();

  expect(wrapper.state('board')).toEqual(solvedBoard);
});


it('should successfully perform eliminate strategy', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const elimBoard = wrapper.instance().eliminate(solutionBoard);

  expect(elimBoard).toEqual(eliminatedBoard);
});


it('should successfully perform onlyChoice strategy', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const onlyBoard = wrapper.instance().onlyChoice(solutionBoard);

  expect(onlyBoard).toEqual(onlyChoicedBoard);
});


it('should successfully reduce elimination strategies', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const reducedBoard = wrapper.instance().reduce(solutionBoard);

  expect(reducedBoard).toEqual(solvedBoard);
});


it('should return false if board is invalid on reduce', () => {
  wrapper.setState({board: unsolvableBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const reducedBoard = wrapper.instance().reduce(solutionBoard);

  expect(reducedBoard).toBe(false);
});


it('should return false for invalid board on search', () => {
  wrapper.setState({board: unsolvableBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const searchedBoard = wrapper.instance().search(solutionBoard);

  expect(searchedBoard).toBe(false);
});


it('should return solved board if board solved on search', () => {
  const searchedBoard = wrapper.instance().search(solvedBoard);

  expect(searchedBoard).toEqual(searchedBoard);
});


it('should solve board and return solved board on search', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const searchedBoard = wrapper.instance().search(solutionBoard);

  expect(searchedBoard).toEqual(solvedBoard);
});


it('should return true for solved board on _checkSolved', () => {
  const isSolved = wrapper.instance()._checkSolved(solvedBoard);

  expect(isSolved).toBe(true);
});


it('should return false for unsolved board on _checkSolved', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const isSolved = wrapper.instance()._checkSolved(solutionBoard);

  expect(isSolved).toBe(false);
});


it('should return array of solved squares on _getSolvedBoxes', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const solvedBoxes = wrapper.instance()._getSolvedBoxes(solutionBoard);

  expect(solvedBoxes).toEqual(["A1", "A5", "A6", "A9", "B1", "B2", "B4", "B6",
    "B8", "C3", "C7", "C9", "D2", "D4", "D6", "D7", "E4", "E5", "E6", "F3",
    "F4", "F6", "F8", "G1", "G3", "G7", "H2", "H4", "H6", "H8", "H9", "I1",
    "I4", "I5", "I9"]);
});


it('should return true for invalid board on _boardInvalid', () => {
  wrapper.setState({board: unsolvableBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  solutionBoard['A1'] = "";
  const isInvalid = wrapper.instance()._boardInvalid(solutionBoard);

  expect(isInvalid).toBe(true);
});


it('should return false for valid board on _boardInvalid', () => {
  wrapper.setState({board: unsolvableBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();
  const isInvalid = wrapper.instance()._boardInvalid(solutionBoard);

  expect(isInvalid).toBe(false);
});


it('should generate a solution board on _createSolutionBoard', () => {
  wrapper.setState({board: unsolvedBoard});
  const solutionBoard = wrapper.instance()._createSolutionBoard();

  expect(solutionBoard).toEqual(unsolvedSolutionBoard);
});
