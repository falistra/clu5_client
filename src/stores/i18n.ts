import { defineStore } from 'pinia';
// import { IDomanda } from 'pages/models';

// const caratteriSpecialiLingue = {
//   '1': [
//     // inglese
//   ],
//   '2': [
//     // francese
//     {
//       unicode: '\u00D9',
//       description: 'LATIN CAPITAL LETTER U WITH GRAVE',
//     },
//     {
//       unicode: '\u00F9',
//       description: 'LATIN SMALL LETTER U WITH GRAVE',
//     },
//     {
//       unicode: '\u00C0',
//       description: 'LATIN CAPITAL LETTER A WITH GRAVE',
//     },
//     {
//       unicode: '\u00E0',
//       description: 'LATIN SMALL LETTER A WITH GRAVE',
//     },
//     {
//       unicode: '\u00C9',
//       description: 'LATIN CAPITAL LETTER E WITH ACUTE',
//     },
//     {
//       unicode: '\u00E9',
//       description: 'LATIN SMALL LETTER E WITH ACUTE',
//     },
//     {
//       unicode: '\u00C8',
//       description: 'LATIN CAPITAL LETTER E WITH GRAVE',
//     },
//     {
//       unicode: '\u00E8',
//       description: 'LATIN SMALL LETTER E WITH GRAVE',
//     },
//     {
//       unicode: '\u00CA',
//       description: 'LATIN CAPITAL LETTER E WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00EA',
//       description: 'LATIN SMALL LETTER E WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00C2',
//       description: 'LATIN CAPITAL LETTER A WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00E2',
//       description: 'LATIN SMALL LETTER A WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00CE',
//       description: 'LATIN CAPITAL LETTER I WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00EE',
//       description: 'LATIN SMALL LETTER I WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00D4',
//       description: 'LATIN CAPITAL LETTER O WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00F4',
//       description: 'LATIN SMALL LETTER O WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00DB',
//       description: 'LATIN CAPITAL LETTER U WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00FB',
//       description: 'LATIN SMALL LETTER U WITH CIRCUMFLEX',
//     },
//     {
//       unicode: '\u00CF',
//       description: 'LATIN CAPITAL LETTER I WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00EF',
//       description: 'LATIN SMALL LETTER I WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00DC',
//       description: 'LATIN CAPITAL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00FC',
//       description: 'LATIN SMALL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00C7',
//       description: 'LATIN CAPITAL LETTER C WITH CEDILLA',
//     },
//     {
//       unicode: '\u00E7',
//       description: 'LATIN SMALL LETTER C WITH CEDILLA',
//     },
//   ],
//   '3': [
//     // tedesco
//     {
//       unicode: '\u00DF',
//       description: 'LATIN SMALL LETTER SHARP S',
//     },
//     {
//       unicode: '\u00DC',
//       description: 'LATIN CAPITAL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00FC',
//       description: 'LATIN SMALL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00D6',
//       description: 'LATIN CAPITAL LETTER O WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00F6',
//       description: 'LATIN SMALL LETTER O WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00C4',
//       description: 'LATIN CAPITAL LETTER A WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00E4',
//       description: 'LATIN SMALL LETTER A WITH DIAERESIS',
//     },
//   ],

//   '4': [
//     // spagnolo
//     {
//       unicode: '\u00BF',
//       description: 'INVERTED QUESTION MARK',
//     },
//     {
//       unicode: '\u00A1',
//       description: 'INVERTED EXCLAMATION MARK',
//     },
//     {
//       unicode: '\u00D1',
//       description: 'LATIN CAPITAL LETTER N WITH TILDE',
//     },
//     {
//       unicode: '\u00F1',
//       description: 'LATIN SMALL LETTER N WITH TILDE',
//     },
//     {
//       unicode: '\u00DC',
//       description: 'LATIN CAPITAL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00FC',
//       description: 'LATIN SMALL LETTER U WITH DIAERESIS',
//     },
//     {
//       unicode: '\u00C9',
//       description: 'LATIN CAPITAL LETTER E WITH ACUTE',
//     },
//     {
//       unicode: '\u00E9',
//       description: 'LATIN SMALL LETTER E WITH ACUTE',
//     },
//     {
//       unicode: '\u00C1',
//       description: 'LATIN CAPITAL LETTER A WITH ACUTE',
//     },
//     {
//       unicode: '\u00E1',
//       description: 'LATIN SMALL LETTER A WITH ACUTE',
//     },
//     {
//       unicode: '\u00CD',
//       description: 'LATIN CAPITAL LETTER I WITH ACUTE',
//     },
//     {
//       unicode: '\u00ED',
//       description: 'LATIN SMALL LETTER I WITH ACUTE',
//     },
//     {
//       unicode: '\u00D3',
//       description: 'LATIN CAPITAL LETTER O WITH ACUTE',
//     },
//     {
//       unicode: '\u00F3',
//       description: 'LATIN SMALL LETTER O WITH ACUTE',
//     },
//     {
//       unicode: '\u00DA',
//       description: 'LATIN CAPITAL LETTER U WITH ACUTE',
//     },
//     {
//       unicode: '\u00FA',
//       description: 'LATIN SMALL LETTER U WITH ACUTE',
//     },
//   ],

//   '5': [
//     // italiano
//     {
//       unicode: '\u00C0',
//       description: 'LATIN CAPITAL LETTER A WITH GRAVE',
//     },
//     {
//       unicode: '\u00C8',
//       description: 'LATIN CAPITAL LETTER E WITH GRAVE',
//     },
//     {
//       unicode: '\u00D9',
//       description: 'LATIN CAPITAL LETTER U WITH GRAVE',
//     },
//     {
//       unicode: '\u00D3',
//       description: 'LATIN CAPITAL LETTER O WITH ACUTE',
//     },
//     {
//       unicode: '\u00EE',
//       description: 'LATIN SMALL LETTER I WITH CIRCUMFLEX',
//     },
//   ],

//   '6': [
//     // arabo
//   ],
//   '666': [
//     // Riservato
//   ],
// };

// const caratteri = Object.entries(caratteriSpecialiLingue).reduce(
//   (a, v) => ({ ...a, [v[0]]: v[1].reduce((a1, v1) => a1 + v1.unicode, '') }),
//   {}
// );

const caratteri: { [Key: string]: string } = {
  1: '', // inglese
  2: 'ÙùÀàÉéÈèÊêÂâÎîÔôÛûÏïÜüÇç', // francese
  3: 'ßÜüÖöÄä', // tedesco
  4: '¿¡ÑñÜüÉéÁáÍíÓóÚú', // spagnolo
  5: 'ÀÈÙÓàèéìòù', // italiano
  6: '', // arabo
  666: '',
};

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    caratteri,
  }),
});
