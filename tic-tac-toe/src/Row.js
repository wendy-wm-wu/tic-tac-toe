import React from 'react';
import Cell from './Cell';


const Row = ({ row, play, rowIndex }) => {
  return (
    <tr>
      {row.map((cell, index) => <Cell key={index} value={cell} play={play} rowIndex={rowIndex} colIndex={index} />)}
    </tr>
  );
};

export default Row; 