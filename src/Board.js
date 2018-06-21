// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
          _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //rowIndex is not an integer; it is an entire row
    hasRowConflictAt: function(rowIndex) {
      var spacesOccupied = 0;
      var hasConflict = false;
      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] === 1) {
          spacesOccupied++;
        }
      }
      if (spacesOccupied > 1) {
        hasConflict = true;
      }      
      return hasConflict; // fixme
    },

    /*
    i: number (index) representing a row to check
    o: boolean representing if that row has multiple spaces occupied
    c: index must be between 0 and n-1 
    e: none 
    
    this function should: take a row to check and return true if the row has more than one space occupied
    relationship between inputs and outputs: the index of a row and the boolean of whether the row has 1+ spaces occupied
    

    initialize counter var spacesOccupied = 0
    initialize hasConflict = false
    iterate through the row
      if the element is equal to 1
         spacesOccupied++
    if spacesOccupied > 1
      hasConflict = true
    return hasConflict
  
    */

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = false;
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(this.rows()[i]) === true) {
          hasConflict = true;
        }
      }
      return hasConflict; // fixme
    },
    
    /*
    i: none 
    o: boolean representing if the entire board has any row conflict
    c: none
    e: none
    
    this function should: check a board if any row has more than one space occupied
    relationship between inputs and outputs: provided with a board, return true if more than space in a row is occupied

    declare a variable called hasConflict = false
    iterate through each row (board.rows, which will return the entire table)
      if row has conflict using hasRowConflictAt with the argument rowNumber 
        set hasConflict to true
    return hasConflict  
    */


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var hasConflict = false;
      var spacesOccupied = 0;
      for (var i = 0; i < this.rows().length; i++) {
        var columnValue = this.rows()[i][colIndex];
        if (columnValue === 1) {
          spacesOccupied++;
        }
      }
        if (spacesOccupied > 1) {
          hasConflict = true;
        }
      return hasConflict; // fixme
    },
    /*
    i: number representing the index of the column to check 
    o: boolean representing if the column has multiple spaces occupied
    c: index must be between 0 and n-1
    e: none
    
    this function should: return true given a column that has more than one space occupied
    relationship between inputs and outputs: if input column has multiple spaces occupied, it returns true
    
    create var hasColConflict = false
    create var spacesOccupied = 0
    iterate through the column 
      if column has a one space occupied
        spacesOcc ++
      if spacesOcc > 1
        hasColFonflict = true
    return hasColConflict
*/
    
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i) === true) {
          hasConflict = true;
        }
      }
      return hasConflict; // fixme
    },

    /*
    i: none
    o: boolean representing if the board has any columns with more than space occupied
    c: none
    e: none
    
    this function should: check the whole board to see if multi spaces occ per column
    relationship between inputs and outputs: returns true if any column has multiple spaces occ

    declare a variable called hasConflict = false
    iterate through each row (board.rows, which will return the entire table)
      if row has conflict using hasRowConflictAt with the argument columnNumber 
        set hasConflict to true
    return hasConflict  
    */


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var eIndex= majorDiagonalColumnIndexAtFirstRow;//declare result array for all elements digonal columns;
      var result = [];
      for (var i = 0; i < this.rows().length ; i++) {//iterate through the row, and elemnts by adding 1 to both coordinates
        //is the index negative?
        if(eIndex < 0){ //yes -- make absoluate and swap the coordinates
          i = Math.abs(eIndex); //reset the starting point of the the iteration
          eIndex = 0;
        }
        result.push(this.rows()[i][eIndex]);//add to the result array and iterate
        eIndex++;
      }
      return this.hasRowConflictAt(result);
    },
    /*
    i: number representing 
    o: boolean representing
    c: none
    e: none
    
    this function should: 
    relationship between inputs and outputs: 
    */

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var hasConflict = false;
      var eIndexStart  = this.rows().length - 1; 
      for (var i = (-eIndexStart); i <= eIndexStart; i++) {
        if (this.hasMajorDiagonalConflictAt(i) === true) {
          hasConflict = true;
        }
      }
      return hasConflict; 
       //declare boolean variable to false
      //iterate through MajorDiagonals starting from negative eIndex to positive eIndex
          //check if any of MajorDiagonals have conflicts
              //if so set boolean var to true
          
      //return boolean variable 
    },
    /*
    i: none
    o: boolean
    c: none 
    e: none
    
    this function should:iterate through all major diagonals, to check if any of them has conflicts
    relationship between inputs and outputs: check if there's any major diagonal conflicts, return boolean results
    */


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var eIndex = minorDiagonalColumnIndexAtFirstRow;//declare result array for all elements digonal columns;
      var result = [];
      for (var i = eIndex; i >= 0; i--) {//iterate through the row, and elemnts by adding 1 to both coordinates 
        eIndex = 0;
        result.push(this.rows()[i][eIndex]);//add to the result array and iterate
        eIndex++;
      } 
      //if the eIndex is larger tahn bound of array (length-)
      return this.hasRowConflictAt(result);
    },
    /*
    i:
    o:
    c:
    e:
    
    this function should:
    relationship between inputs and outputs:
    */

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }
    /*
    i:
    o:
    c:
    e:
    
    this function should:
    relationship between inputs and outputs:
    */
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
