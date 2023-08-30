import { shuffleWords } from './WordsShuffler';
import { LocalStorage } from '../data/LocalStorage';


export {}

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: any,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
): void => {
  if (msg.shuffleWords === true) {
    shuffleWords(document)
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

    if ((config.featuresEnabled?.SHUTTLE ?? false)) {
      shuffleWords(window.document)

    }
  })
}
