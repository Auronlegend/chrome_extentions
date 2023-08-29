import { loadSelectedVowel } from '../data/LocalStorage';
import { replaceVowelsInDocument } from './VowelsReplacer';

export {}

function replaceVowels (vowel: string, root?: any): void {
  replaceVowelsInDocument(root ?? document.body, vowel.toLowerCase())
}

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
): void => {
  if (msg.selectedVowel !== undefined) {
    replaceVowels(msg.selectedVowel as string, document);
  }

  sendResponse('OK');
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

window.onload = (_ev) => {
  console.log('window onload replacement:');
  void loadSelectedVowel().then((vowel) => {
    if (vowel !== undefined) {
      replaceVowels(vowel, window.document);
    }
  });
}
