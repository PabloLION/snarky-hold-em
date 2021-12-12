# 🃏 for Mina Bootcamp

My current problems about MINA:

1. Texas Hold'em is a long game. It's better to use multiple files to modularize the process.
   1. How to call other snapps on chain. Is there a smart contract list that we can use as tool?
   2. User and server should run different snapps can communicate with each other.
2. What should stay on-chain. How's the chain only 22KB?
3. Need more docs on `State<Field>`. It seems can only be read once?
4. How to send message to a specific account? I did Hash(`AccountPublicKey+Message`), but don't know where to post this message. Would be too many things on the chain if we do this every time dealing a card.

## Dev process

### Day 1: Find a game to make

- Considered Civ6, Quarto, Texas Hold'em.
- Decided to write a Texas Hold'em.
- Some UI for test. (didn't reach there after 3 days) I think [wallaceturner/crypto-poker](https://github.com/wallaceturner/crypto-poker) is a good. But too complicated to use. It's written with [AureliaJS](https://aurelia.io/)
- Read again[mitschabaude/snarkyjs-sudoku](https://github.com/mitschabaude/snarkyjs-sudoku)
- Tried to implement an AI: [wenkesj/holdem](https://github.com/wenkesj/holdem)

### Day 2: UI & Poker Engine

- Wrote a simple UI myself to show cards from `card_code`
- Tried to implement some extensions
  - [rundef/node-poker-odds-calculator](https://github.com/rundef/node-poker-odds-calculator)
  - [ktseng/holdem_calc](https://github.com/ktseng/holdem_calc)
- Looked for Poker engine
  - [goldfire/pokersolver](https://github.com/goldfire/pokersolver)
  - Didn't use[mjhbell/node-poker](https://github.com/mjhbell/node-poker). Out of date, no NPM.
  - Didn't use [brunoscopelliti/poker-holdem-engine](https://github.com/brunoscopelliti/poker-holdem-engine), because it's an online API and seems everyone can shuffle the deck.
- Wrote a part of my poker engine (class `OldDeck`) to encode/decode card deck shuffle deal cards. Other engines don't have a way to encode/decode.
  > encode refers is a function, which takes the card order of the deck and gives a `BigInt`, decode is its inverse.
  > It's for saving the deck so to continue later.
  > On day 3 I found it not needed: just draw a random card from the deck and deal it.
- Wrote a new deck with a function to show deck like the table below

  | Shown | Meaning          |
  | ----- | ---------------- |
  | "A♣"  | Ace of Spades    |
  | "Q♦"  | Queen of Hearts  |
  | "9♥"  | Nine of Diamonds |
  | "5♠"  | Five of Clubs    |

- Improve development environment (my tool)
- SnarkyJS
  - read [TicTacToe guide](https://o1labs.org/tictactoe)
  - debug `await this.gameStage.get();` can't use twice, where `gameStage` is a `State<Field>` (failed)
  - Came up with a new way to record the bookkeeping of the game. Charge all user with a `buyIn` then note it down to a `Map<PlayerPublicKey, CreditBalance>`.

## Day 3

- SnarkyJS
  - Tried(failed) to deal card, as aforementioned "4. How to send message to a specific account?"
  - Tried(failed) to make two snapps, one for user and one for server.
- Wanted to change the project to TicTacToe with UI and bet.
  - Started a new repo for TicTacToe and copied the code from [TicTacToe guide](https://o1labs.org/tictactoe).
  - Reevaluated that I cannot finish it either(in 2h).
- Git
  - Fixed detached head
  - Upload GitHub
  - Fix typo while writing this doc.

## feature goal

- Timer
- Show and use bets/buyIn/credits in USD.

## Docs/Contribution

### Name space

#### Poker Game

From Hold'em rule

- `startingHand`:First two cards (only the holder can see), known as "hole cards" as well
- `flop`: First three cards
- `turn`: The fourth card, an additional single card ("the turn" or "fourth street")
- `river`: The fifth card, a final card card ("the river" or "fifth street")
- Some other names (not used, maybe wrong)
  - Continuation Bet
  - Early Position
  - Continuation-in Part
  - Flop Turn River
  - Suited Connectors
  - Big Bets
  - Secret Betting Club
  - Continuation Entries
  - Set Direct
  - Fixed Point Continuation

To use [goldfire/pokersolver](https://github.com/goldfire/pokersolver)

- First uppercase character for number, second lowercase character for suit. See examples below.
  "As": Ace of Spades
  "Qh": Queen of Hearts
  "9d": Nine of Diamonds
  "5c": Five of Clubs

## Thank list

- [Texas hold 'em](https://en.wikipedia.org/wiki/Texas_hold_'em)
- [wallaceturner](https://github.com/wallaceturner/crypto-poker)

### Special thanks

- [Bo Yao](https://github.com/ailisp) for encouraging me to start this project and the help of [Mental poker](https://en.wikipedia.org/wiki/Mental_poker) model

### MINA questions

- Can I check now many MINA does user have? Or does user have XXX amount of MINA?

## Dev story

- Why do I want to shuffle ? ? ?? ?? ??
  Truly the status number will be much much fewer w/o shuffle.
