# Sudoku Solver
This is a simple React implementation of a Sudoku Solver to illustrate the
basics of constraint propagation.

[Check out the live version](https://itsjustdanger.github.io/sudoku-solver/)

## Constraint Propagation
The constraints here are the rules of Sudoku, and we satisfy our constraints by eliminating from squares the values that violate those constraints.

In this simple example, we do this by implementing only two elimination methods:
1. Eliminate - Removes from a square possible values that match values of solved boxes that are on the same horizontal axis, vertical axis, or within the same sub-square.

2. Only Choice - Assigns a value to a square when that value can only exist within that square amount the square's peers.

We utilize these constraint satisfaction techniques to effectively prune our eventual search of possible solution boards and drastically reduce search time.

We could easily add more elimination methods to further prune our search tree, but this is intended to be a simple illustration of the concept and, as it is, even with these two simple elimination methods, we can solve nearly any sudoku puzzle within a few seconds.

## Browser Support
The demo and code should work on any browser that supports ES6.
This has not been extensively tested on mobile devices.

## References and Further Reading
[Sudoku](https://en.wikipedia.org/wiki/Sudoku)

[Constraint Satisfaction](https://en.wikipedia.org/wiki/Constraint_satisfaction)

## License
MIT License

Copyright (c) 2017 Dan Reich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
