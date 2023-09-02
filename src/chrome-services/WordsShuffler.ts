import { getTextNodes, shuffleArray } from '../utils/Utils';

export const shuffleWords = (root: HTMLElement | Node): void => {
  getTextNodes(root).forEach((element) => {
    if (element.nodeType === Node.TEXT_NODE && element.textContent !== null) {
      element.textContent = shuffleArray(
        element.textContent
          .trim()
          .split(' ')
          .map((e) => e.replace(/(\r\n|\n|\r)/gm, ''))
          .filter((e) => e.length !== 0 || !(e.includes('\n')))
      ).join(' ');
    }
  });
};
