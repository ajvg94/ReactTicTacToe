import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winningCombinations.js';

const INITIAL_GAMEBOARD = [[null, null, null],[null, null, null],[null, null, null]];
const PLAYERS = { X: 'Player 1', O: 'Player 2'}
function getCurrentPlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O';
  return currentPlayer;
}

function getWinner(gameBoard, playerNames){
  let winner = null;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) 
      winner = playerNames[firstSquare];
  }

  return winner;
}

function getGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const currentPlayer = getCurrentPlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, playerNames);
  const itsDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = getCurrentPlayer(gameTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName){
    setPlayerNames(prevPlayerNames => {
      return {
        ...prevPlayerNames,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={(currentPlayer === 'X')} onChangeName={handlePlayerName}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={(currentPlayer === 'O')} onChangeName={handlePlayerName}/>
        </ol>
        {(winner || itsDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
