// Generate puzzle using the algorithm described below:
//  https://www.geeksforgeeks.org/program-sudoku-generator/


//solve algorithm was inspired by solution explained in video below
//  https://www.youtube.com/watch?v=eAFcj_2quWI&t=224s

const puzzle = Array.from({ length:9 }, () => Array.from({ length: 9 }, () => 0));

const remove = (grid, k) => {
  while(k !==0) {
    let i = Math.floor(Math.random()*8) + 1;
    let j = Math.floor(Math.random()*8) + 1;
    if(grid[i][j] !== 0) {
      k--;
      grid[i][j] = 0;
    }
  }
}
const solve = (grid, r=0, c=0) => {
  if(r===9){
    return true;
  } else if(c===9){
    return solve(grid, r+1, 0);
  } else if(grid[r][c] !== 0){
    return solve(grid, r, c+1);
  } else {
    for(let k=1; k<10; k++){
      if(isValid(grid, r, c, k)) {
        grid[r][c] = k;
        if(solve(grid, r, c+1)){
          return true;
        }
        grid[r][c] = 0;
      }
    }
    return false;
  }
}
const isValid = (grid, r, c, k) => {
  let not_in_row = !grid[r].includes(k);
  let not_in_column = !grid.map((e, i) => e[c]).includes(k);

  let box= grid.filter((e, i) => i>=Math.floor(r/3)*3&&i<Math.floor(r/3)*3+3)

  let not_in_box = 
    !box[0].slice(Math.floor(c/3)*3, Math.floor(c/3)*3+3)
      .concat(box[1].slice(Math.floor(c/3)*3, Math.floor(c/3)*3+3))
      .concat(box[2].slice(Math.floor(c/3)*3, Math.floor(c/3)*3+3))
      .includes(k);
  return not_in_row && not_in_column && not_in_box;
}
const diagonal = () => {
  for(let i=0; i<3; i++) {
    const range = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    let j;
    if(i===0) j=0;
    else if(i===1) j=3;
    else j=6;

    let limit1= j+3;
    for( ; j<limit1; j++) {
      let k;
      if( j<3 ) k=0;
      else if(j<6) k=3;
      else k=6;

      let limit2 = k+3;
      for( ; k<limit2; k++) {
        let randNum = Math.floor(Math.random() * 9) + 1;
        while(!range.has(randNum))
          randNum = Math.floor(Math.random() * 9) + 1;
        puzzle[j][k]= randNum;
        range.delete(randNum);
      }
    }
  }

  let sudoku = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
  for(let i=0; i<9; i++) {
    for(let j=0; j<9; j++) {
      sudoku[i][j] = puzzle[i][j];
    }
  }

}
export const generatePuzzle = () => {
  //Fill diagonal matrices
  diagonal();
  //recursively solve new puzzle
  solve(puzzle);
  const solution = puzzle.map(arr => arr.slice());
  //remove elements
  remove(puzzle, 20);

  return [puzzle, solution];
};