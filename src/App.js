import './App.css';
import { generatePuzzle } from './util/Puzzle';

import { useState } from 'react';

function App() {
  let sudoku = generatePuzzle();
  console.log('unsolved');
  console.log(sudoku[0]);
  console.log('solved')
  console.log(sudoku[1]);
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
          <button className="checkButton">Check</button>
          <button className="solveButton">Solve</button>
          <button className="resetButton">Reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
