export const card_codes = [
  'Tc',
  'Td',
  'Th',
  'Ts',
  '2c',
  '2d',
  '2h',
  '2s',
  '3c',
  '3d',
  '3h',
  '3s',
  '4c',
  '4d',
  '4h',
  '4s',
  '5c',
  '5d',
  '5h',
  '5s',
  '6c',
  '6d',
  '6h',
  '6s',
  '7c',
  '7d',
  '7h',
  '7s',
  '8c',
  '8d',
  '8h',
  '8s',
  '9c',
  '9d',
  '9h',
  '9s',
  'Ac',
  'Ad',
  'Ah',
  'As',
  'Jc',
  'Jd',
  'Jh',
  'Js',
  'Kc',
  'Kd',
  'Kh',
  'Ks',
  'Qc',
  'Qd',
  'Qh',
  'Qs',
];
export const cardSpriteOrder = [...card_codes, 'Cb'] as const;
// export type CardCode = Exclude<typeof cardSpriteOrder[number], 'Cb'>;
export type CardCode = typeof card_codes[number];
export type PokerFaceCode = typeof cardSpriteOrder[number];
// | 'As'  | 'Ks'  | 'Qs'  | 'Js'  | 'Ts'  | '9s'  | '8s'  | '7s'  | '6s'  | '5s'  | '4s'  | '3s'  | '2s'
// | 'Ah'  | 'Kh'  | 'Qh'  | 'Jh'  | 'Th'  | '9h'  | '8h'  | '7h'  | '6h'  | '5h'  | '4h'  | '3h'  | '2h'
// | 'Ad'  | 'Kd'  | 'Qd'  | 'Jd'  | 'Td'  | '9d'  | '8d'  | '7d'  | '6d'  | '5d'  | '4d'  | '3d'  | '2d'
// | 'Ac'  | 'Kc'  | 'Qc'  | 'Jc'  | 'Tc'  | '9c'  | '8c'  | '7c'  | '6c'  | '5c'  | '4c'  | '3c'  | '2c'
// | 'Cb'; // card back, red
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
