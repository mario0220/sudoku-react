import './App.css';
import { generatePuzzle } from './util/Puzzle';

import { useState } from 'react';

let sudoku = generatePuzzle();
function App() {
  const [sudokuArr, setSudokuArr] = useState(sudoku[0]);
  const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  }

  const onInputChange = (e, row, col) => {
    var val = parseInt(e.target.value) || 0, grid = getDeepCopy(sudokuArr);
    //input value should range from 1 to 9 and 0 for empty cell
    if(val === 0 || val>=1 && val <= 9) {
      grid[row][col] = val;
    }
    setSudokuArr(grid);
  }

  //funciton checks if sudoku matches solution
  const checkSudoku = () => {
    //let compare = compareSudokus(sudokuArr, sudoku[0]);
    let res = {
      isComplete: true,
      isSolvable: true
    }
    for(let i=0; i<9; i++) {
      for(let j=0; j<9; j++) {
        if (sudokuArr[i][j] !== sudoku[1][i][j]) {
          if (sudokuArr[i][j] !== 0) {
            res.isSolvable = false;
          }
        }
        res.isComplete = false;
      }
    }
    if(res.isComplete) {
      alert('congratulations! You have solved this sudoku puzzle');
    } else if (res.isSolvable) {
      alert('Keep going!');
    } else {
      alert('Sudoku does not match our solution, Try again!');
    }
  }
  //fills out sudoku board with saved solution
  const solveSudoku = () => {
    setSudokuArr(sudoku[1]);
  }
  const resetSudoku = () => {
    setSudokuArr(sudoku[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Sudoku The Game</h3>
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row,rIndex) => {
                return <tr key={rIndex} className={(row +1) %3 === 0 ? "bBorder": ""}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return <td key={rIndex + cIndex} className={(col +1) %3 === 0 ? "rBorder": ""}>
                      <input 
                        onChange={(e) => onInputChange(e,row,col)}
                        value={sudokuArr[row][col] ===0? '': sudokuArr[row][col]}
                        className="cellInput" 
                        disabled={sudoku[0][row][col] !== 0}/>
                    </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <div className='buttonContainer'>
          <button className="checkButton" onClick={checkSudoku}>Check</button>
          <button className="solveButton" onClick={solveSudoku}>Solve</button>
          <button className="resetButton" onClick={resetSudoku}>Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
