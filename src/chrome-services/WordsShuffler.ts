import { getTextNodes } from '../utils/Utils';

const utilShuffleArray = (array: any[]): any[] => {
  let newArr: any[] = []
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    newArr = [...newArr, array]
  }
  return newArr
}

export const shuffleWords = (root: HTMLElement | Node): void => {
  console.log(root, 'root')
  getTextNodes(root).forEach((element) => {
    console.log(element.textContent, 'content')
    if (element.nodeType === Node.TEXT_NODE) {
      if (element.textContent !== null) {
        element.textContent = utilShuffleArray(element.textContent.split(' ')).join(' ');
      }
    }
  })
}
