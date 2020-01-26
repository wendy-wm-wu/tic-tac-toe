import React from 'react';
import Cell from './Cell';


const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, index) => <Cell key={index} cell={cell} />)}
    </tr>
  );
};

export default Row; 