import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CardCode } from './poker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export type Currency = string; // TODO: add some currencies
export type PokerStage = 'no-game' | 'pre-flop' | 'flop' | 'turn' | 'river';

export interface PlayerProps {
  playerID: string;
  displayName: string;
  prefCurrency: Currency;
  // tables: number[];
}

export interface Room {
  roomId: string;
  players: PlayerProps[];
  // playersID
  pokerStage: PokerStage;
  cardsOnTable: CardCode[];
}
