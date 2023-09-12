import { getNodesByFilter } from '../utils/Utils';

const localImages = [
  'assets/1.jpeg',
  'assets/2.jpeg',
  'assets/3.jpeg',
  'assets/4.jpeg',
  'assets/5.jpeg',
  'assets/6.jpeg',
  'assets/7.jpeg',
  'assets/8.jpeg',
  'assets/9.jpeg',
  'assets/10.jpeg'
];

export const flashImagesInDocument = (root: HTMLElement | Node): void => {
  console.log('🚀 ~ file: FlashingImage.ts:17 ~ flashImagesInDocument ~ root:', root)
  getNodesByFilter(root, 'SHOW_ALL').forEach((element) => {
    if (element?.nodeName?.toUpperCase() === 'DIV') {
      console.log('🚀 ~ file: FlashingImage.ts:18 ~ getNodesByFilter ~ element:', element.nodeName)
      if (element.parentElement !== null) {
        console.log('🚀 ~ file: FlashingImage.ts:22 ~ getNodesByFilter ~ element:', element)
        element.parentElement.style.background = `url("${chrome.runtime.getURL(localImages[Math.floor(Math.random() * localImages.length)])}`
        //  .background = `url("${chrome.runtime.getURL(
        //       localImages[Math.floor(Math.random() * localImages.length)]
        //     )}")`;
        // document.body.style.backgroundSize = 'contain';
      }
    }
  });
};
