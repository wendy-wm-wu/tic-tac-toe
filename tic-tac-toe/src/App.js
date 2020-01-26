import React, { Component } from 'react';
import './App.css';
import Row from './Row';

class App extends Component {
  state = {
    player1: 'X',
    player2: 'O', 
    currentPlayer: null,
    board: [],
    gameOver: false,
    message: '',
  }

  componentDidMount = () => {
    this.initBoard(); 
  }

  initBoard = () => {
    const { board, player1 } = this.state; 
    
    for (let r = 0; r < 3; r++) {
      board[r] = [];
      for (let c = 0; c < 3; c++) {
        board[r][c] = null; 
      }
    }
    this.setState({
      currentPlayer: player1,
      board,
      gameOver: false,
      message: '',
    });
  };

  togglePlayer = () => {
    const { currentPlayer, player1, player2 } = this.state;
    return currentPlayer === player1 ? player2 : player1; 
  };

  //play function 
  play = (row, col) => {
    const { board, gameOver, currentPlayer, player1, player2 } = this.state;
    //if game isn't over 
    if (!gameOver) {
      if (board[row][col] === null) {
        board[row][col] = currentPlayer; 
      }
      //check for wins or not and change states 
      let result = this.checkAll(board);
      if (result === player1) {
        this.setState({
          board,
          gameOver: true,
          message: 'Player 1 wins',
        });
      } else if (result === player2) {
        this.setState({
          board,
          gameOver: true,
          message: 'Player 2 wins',
        });
      } else if (result === 'Draw') {
        this.setState({
          board,
          gameOver: true,
          message: 'Tie game!',
        });
      } else {
        this.setState({
          board,
          currentPlayer: this.togglePlayer(),
        });
      }
    } else {
      this.setState({
        message: 'Game over. Please restart a new game.',
      });
    }
  };

  //check for wins (vertical, horizontal, diagonal)
  checkAll = (board) => {
    return this.checkVertical(board) || this.checkHorizontal(board) || this.checkDiagonalLeft(board) || this.checkDiagonalRight(board) || this.checkDraw(board); 
  };

  checkVertical = (board) => {
    let r = 2;
    let c = 0;
    while (r > 0 && c < 3) {
      if (board[r][c]) {
        if (board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c]) {
            return board[r][c];
        }
      }
      c++; 
    }
  };

  checkHorizontal = (board) => {
    let r = 0;
    let c = 0; 
    while (r < 3 && c < 3) {
      if (board[r][c]) {
        if (board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2]) {
            return board[r][c]; 
        }
      }
      r++; 
    }
  };

  checkDiagonalLeft = (board) => {
    for (let r = 2; r >= 0; r--) {
      for (let c = 2; c >= 0; c--) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2]) {
              return board[r][c];
          } 
        }
        return; 
      }
    }
  };

  checkDiagonalRight = (board) => {
    for (let r = 2; r >= 0; r--) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2]) {
              return board[r][c]; 
          }
        }
        return;
      }
    }
  };

  checkDraw = (board) => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === null) {
          return false; 
        }
      }
    }
    return 'Draw'; 
  }

  render() {
    const { board, message } = this.state;
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <button onClick={this.initBoard}>New Game</button>
        <div className="tic-tac-toe">
          <table>
            <tbody>
              {board.map((row, index) => <Row key={index} row={row} play={this.play} rowIndex={index} />)}
            </tbody>
          </table>
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

export default App;
