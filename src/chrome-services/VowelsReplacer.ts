import { getTextNodes } from '../utils/Utils';

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'è', 'é'];

const isUpperCase = (str: string): boolean => /^[A-Z]*$/.test(str);

const charToVowelLambda = (vowel: string) => (ch: string) =>
  VOWELS.includes(ch.toLowerCase())
    ? isUpperCase(ch)
      ? vowel.toUpperCase()
      : vowel
    : ch;

const replaceVowelsInText = (text: string, vowel: string): string =>
  text.split('').map(charToVowelLambda(vowel)).join('');

export const replaceVowelsInDocument = (
  root: HTMLElement | Node,
  vowel: string
): void => {
  console.log('Replacing all vowels with: ' + vowel);
  getTextNodes(root).forEach((element) => {
    if (element.nodeType === Node.TEXT_NODE) {
      element.textContent = replaceVowelsInText(
        element.textContent ?? '',
        vowel
      );
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      replaceVowelsInDocument(element, vowel);
    }
  });
};
