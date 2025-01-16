import { getNodesByFilter } from '../utils/Utils';

const localImages = [
  '1.jpeg',
  '2.jpeg',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg',
  '7.jpeg',
  '8.jpeg',
  '9.jpeg',
  '10.jpeg'
];

export const flashImagesInDocument = (root: HTMLElement | Node): void => {
  getNodesByFilter(root, 'SHOW_ALL').forEach((element) => {
    // if (element?.nodeName?.toUpperCase() === 'DIV') {
    //   if (Math.random() < 0.1 && element.parentElement !== null) {
    //     element.parentElement.style.backgroundImage = `url("${chrome.runtime.getURL(localImages[Math.floor(Math.random() * localImages.length)])}`
    //     //  .background = `url("${chrome.runtime.getURL(
    //     //       localImages[Math.floor(Math.random() * localImages.length)]
    //     //     )}")`;
    //     // document.body.style.backgroundSize = 'contain';
    //   }
    // }
    if (element?.nodeName?.toUpperCase() === 'IMG') {
      console.log('🚀 ~ file: FlashingImage.ts:29 ~ getNodesByFilter ~ element:', element)
      if (element.parentElement !== null) {
        const a = element.parentElement
        const b = a.querySelectorAll('img')
        let newElement = null
        b.forEach(el => {
          newElement = document.createElement('img')
          newElement.src = localImages[Math.floor(Math.random() * localImages.length)]
          element.parentElement?.replaceChild(el, newElement)
        })
        // element .forEach(el =>  setAttribute('src', `url("${chrome.runtime.getURL(localImages[Math.floor(Math.random() * localImages.length)])}`))
        //  .background = `url("${chrome.runtime.getURL(
        //       localImages[Math.floor(Math.random() * localImages.length)]
        //     )}")`;
        // document.body.style.backgroundSize = 'contain';
      }
    }
  });
};
