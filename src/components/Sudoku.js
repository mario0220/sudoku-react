import React from 'react'
import Cell from './Cell';
import { generatePuzzle } from '../util/Puzzle';

export default function Sudoku() {
  let solve = generatePuzzle();
  console.log('unsolved');
  console.log(solve[0]);
  console.log('solved')
  console.log(solve[1]);
  return (
      <Cell />
  )
}
