/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var rooksOnBoard = 0;

  var board = new Board({'n': n});
  // console.log('board instantiated', board)
  if (n === 0) {
    return board.rows(); 
  }
  var innerRecursive = function(currentBoard) {
    if (rooksOnBoard === n) {
      return board.rows(); 
    } else {
      for (var row = 0; row < n; row++) {
        for (var column = 0; column < n; column++) {
          if (board.get(row)[column] !== 1) {
            board.togglePiece(row, column);
            // console.log('currentboard', board)
            rooksOnBoard++;
            if (board.hasAnyRowConflicts() === false && board.hasAnyColConflicts() === false) {
              innerRecursive(board);
            } else {
              board.togglePiece(row, column);
            }
          }
        }
      }
    }
  };
  // debugger;
  return innerRecursive(board);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(innerRecursive(board)));
  
};

/*
input: an integer representing a board length and number of rooks to place
output: an array containing arrays that represent a nxn board with n rooks
constraints: none
edge cases: none

this function should: add n rooks to the board and return the first board where there are no horizontal and vertical conflicts

for var row = 0; row < n; row++ //this allows us to place the first piece anywhere on the nxn board
  for var column = 0; col < n; col++
    if there is not a piece at (row, col)
      add a piece
        call the func recursively on the board that now has a piece ONLY if it has no vertical or horizntal conflicts
  stop recursion when num of rooks on the board is equal to n
if array()



//declare counter = n
//1)iterate each spot of the board while placing the piece  
  //leave the piece at the first spot without conflicts//item
  //n - 1
//2)recurse to step 1)
//stops when n moves are placed 
//or when reaching end of the board with <n moves places 
//return the solution 

*/


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
