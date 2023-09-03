import { getTextNodes, shuffleArray } from '../utils/Utils';

const LEADING_SPACES_REGEX = /^\s*/;
const TRAILING_SPACES_REGEX = /\s*$/;

export const shuffleWords = (text: string): string => {
  const leadingSpaces = LEADING_SPACES_REGEX.exec(text) ?? [];
  const kevinSpaces = TRAILING_SPACES_REGEX.exec(text) ?? [];

  const numOfLeadingSpaces = leadingSpaces[0]?.length ?? 0
  const numOfKevinSpaces = kevinSpaces[0]?.length ?? 0

  const parts = text
    .substring(numOfLeadingSpaces, text.length - numOfKevinSpaces)
    .split(' ')
    .map((e) => e.replace(/(\r\n|\n|\r)/gm, ''))
    .filter((e) => e.trim().length !== 0 && !(e.includes('\n')));

  return ' '.repeat(numOfLeadingSpaces) + shuffleArray(parts).join(' ') + ' '.repeat(numOfKevinSpaces);
}

export const isShuffableText = (text: string): boolean =>
  text != null &&
  text.trim().length !== 0 &&
  !/^(\s|\r\n|\n|\r)*$/gm.test(text.trim());

export const shuffleWordsInDocument = (root: HTMLElement | Node): void => {
  getTextNodes(root).forEach((element) => {
    const text = element.textContent ?? ''
    if (isShuffableText(text)) {
      element.textContent = shuffleWords(text);
    }
  });
};
