import React from 'react';
import './App.css';

const Cell = ({ value, play, rowIndex, colIndex }) => {
  return (
    <td>
      <div className="cell" onClick={() => play(rowIndex, colIndex)} data-pro={value}>{value}
      </div>
    </td>
  );
};

export default Cell;