import { LocalStorage } from '../data/LocalStorage';
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
  console.log(msg, 'message')

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
  void LocalStorage.loadLocalStorageConfiguration().then((config) => {
    if (config == null) {
      return;
    }

    if ((config.isVowelReplaceEnabled ?? false) && config.selectedVowel !== undefined) {
      replaceVowels(config.selectedVowel, window.document);
    }
  })
}
