import { getTextNodes } from '../utils/Utils';

const utilShuffleArray = (array: any[]): any[] => {
  array.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });
  return array;
};

export const shuffleWords = (root: HTMLElement | Node): void => {
  console.log(root, 'root');
  getTextNodes(root).forEach((element) => {
    if (element.nodeType === Node.TEXT_NODE && element.textContent !== null) {
      element.textContent = utilShuffleArray(
        element.textContent
          .trim()
          .split(' ')
          .map((e) => e.replace(/(\r\n|\n|\r)/gm, ''))
          .filter((e) => e.length !== 0 || !e.includes('\n'))
      ).join(' ');
    }
  });
};
