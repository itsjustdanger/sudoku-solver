# Sudoku Solver
This is a simple React implementation of a Sudoku Solver to illustrate the
basics of constraint propagation.

[Checkout the live version](https://itsjustdanger.github.io/sudoku-solver/)

## Constraint Propagation
The constraints here are the rules of Sudoku, and we satisfy our constraints by eliminating from squares the values that violate those constraints.

In this simple example, we do this by implementing only two elimination methods:
1. Eliminate - Removes from a square possible values that match values of solved boxes that are on the same horizontal axis, vertical axis, or within the same sub-square.

2. Only Choice - Assigns a value to a square when that value can only exist within that square amount the square's peers.

We utilize these constraint satisfaction techniques to effectively prune our eventual search of possible solution boards and drastically reduce search time.

We could easily add more elimination methods to further prune our search tree, but this is intended to be a simple illustration of the concept and, as it is, even with these two simple elimination methods, we can solve nearly any sudoku puzzle within a few seconds.

## Browser Support
The demo and code should work on any browser that supports ES6.

## License

## References and Further Reading
