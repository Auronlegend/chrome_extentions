import { LocalStorage } from '../data/LocalStorage';
import { flashImagesInDocument } from '../features/FlashingImage';
import { replaceVowelsInDocument, replaceVowelsInText } from '../features/VowelsReplacer';
import { isShuffableText, shuffleWords, shuffleWordsInDocument } from '../features/WordsShuffler';
import { DOMTextReplacer } from '../helpers/DOMTextReplacer';

export {}

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
): void => {
  console.log(msg, 'message')

  if (msg.selectedVowel !== undefined) {
    replaceVowelsInDocument(document.body, msg.selectedVowel.toLowerCase())
  }

  if (msg.shuffleWords === true) {
    shuffleWordsInDocument(document, msg.shuffleWordsIntensity ?? 10)
  }

  if (msg.flashImages === true) {
    flashImagesInDocument(document);
  }

  sendResponse('OK');
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

window.onload = (_ev) => {
  void LocalStorage.loadLocalStorageConfiguration().then((config) => {
    if (config == null) {
      return;
    }

    const textReplacer = new DOMTextReplacer();

    if ((config.featuresEnabled?.VOWELS ?? false) && config.selectedVowel !== undefined) {
      const vowel = config.selectedVowel;
      textReplacer.addFunction('replace-vowels', (text: string) => {
        return replaceVowelsInText(text, vowel.toLowerCase())
      });
    }

    if ((config.featuresEnabled?.SHUTTLE ?? false)) {
      textReplacer.addFunction('shuffle-words', (text: string) => {
        if (isShuffableText(text)) {
          return shuffleWords(text, config.shuffleWordsIntensity ?? 10);
        }
        return text;
      });
    }

    if ((config.featuresEnabled?.FLASH_IMAGE ?? false)) {
      flashImagesInDocument(document)
    }

    textReplacer.replaceInDocument(document);
  });
}
