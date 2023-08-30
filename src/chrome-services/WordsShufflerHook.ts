import { shuffleWords } from './WordsShuffler';

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
  console.log('window onload shuffling:');
  shuffleWords(document)
}
