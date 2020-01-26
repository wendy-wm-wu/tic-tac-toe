import React, { Component } from 'react';
import './App.css';
import Row from './Row';

class App extends Component {
  state = {
    player1: 1,
    player2: 2, 
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
    
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = null; 
      }
    }
    this.setState({
      currentPlayer: player1,
      board,
      gameOver: false,
      message: '',
    });
  };

  render() {
    const { board } = this.state;
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <button onClick={this.initBoard}>New Game</button>
        <div className="tic-tac-toe">
          <table>
            <tbody>
              {board.map((row, index) => <Row key={index} row={row} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
