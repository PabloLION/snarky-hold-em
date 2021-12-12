export const card_codes = JSON.parse(
  '["2d","2c","2h","2s","3d","3c","3h","3s","4d","4c","4h","4s","5d","5c","5h","5s","6d","6c","6h","6s","7d","7c","7h","7s","8d","8c","8h","8s","9d","9c","9h","9s","Td","Tc","Th","Ts","Jd","Jc","Jh","Js","Qd","Qc","Qh","Qs","Kd","Kc","Kh","Ks","Ad","Ac","Ah","As"]'
);
export const cardSpriteOrder = JSON.parse(
  '{"order":["Tc","Td","Th","Ts","2c","2d","2h","2s","3c","3d","3h","3s","4c","4d","4h","4s","5c","5d","5h","5s","6c","6d","6h","6s","7c","7d","7h","7s","8c","8d","8h","8s","9c","9d","9h","9s","Ac","Ad","Ah","As","Jc","Jd","Jh","Js","Kc","Kd","Kh","Ks","Qc","Qd","Qh","Qs","Cb"]}'
);
// export const cardSpriteOrder = [...card_codes, 'Cb' ]
// export type CardCode = Exclude<typeof cardSpriteOrder[number], 'Cb'>;
export type CardCode = typeof card_codes[number];
export type PokerFaceCode = typeof cardSpriteOrder[number];
// | 'As'  | 'Ks'  | 'Qs'  | 'Js'  | 'Ts'  | '9s'  | '8s'  | '7s'  | '6s'  | '5s'  | '4s'  | '3s'  | '2s'
// | 'Ah'  | 'Kh'  | 'Qh'  | 'Jh'  | 'Th'  | '9h'  | '8h'  | '7h'  | '6h'  | '5h'  | '4h'  | '3h'  | '2h'
// | 'Ad'  | 'Kd'  | 'Qd'  | 'Jd'  | 'Td'  | '9d'  | '8d'  | '7d'  | '6d'  | '5d'  | '4d'  | '3d'  | '2d'
// | 'Ac'  | 'Kc'  | 'Qc'  | 'Jc'  | 'Tc'  | '9c'  | '8c'  | '7c'  | '6c'  | '5c'  | '4c'  | '3c'  | '2c'
// | 'Cb'; // card back, red
export type CardFace = ReturnType<typeof card_code_to_face>;
export const card_code_to_face = (card_code: CardCode) => {
  const face = card_code[0];
  const suit = card_code[1];
  switch (suit) {
    case 'c':
      return `${face}♣`;
    case 'd':
      return `${face}♦`;
    case 'h':
      return `${face}♥`;
    case 's':
      return `${face}♠`;
    default:
      return 'Cb';
  }
};
