# 🃏 for Mina Bootcamp

Current MINA problems:

1. Texas Hold'em is a long game. It's better to use multiple files to modularize the process.
   1. How to call other snapps on chain. Is there a smart contract list that we can use as tool?
   2. User and server should run different snapps can communicate with each other.
2. What should stay on-chain. How's the chain only 22KB?
3. Need more docs on `State<Field>`. It seems can only be read once?
4. How to send message to a specific account? I did Hash(`AccountPublicKey+Message`), but don't know where to post this message. Would be too many things on the chain if we do this every time dealing a card.

## Poker engine

- [goldfire/pokersolver](https://github.com/goldfire/pokersolver)

## Docs/Contribution

### Naming space

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
