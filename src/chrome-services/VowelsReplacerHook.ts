import { addListener } from "process";
import { loadSelectedVowel } from "../data/LocalStorage";
import { replaceVowelsInDocument } from "./VowelsReplacer";

export {}

function hook_replaceVowels(vowel: string, root?: any) {
  replaceVowelsInDocument(root ?? document.body, vowel.toLowerCase())
}

// Function called when a new message is received
const messagesFromReactAppListener = (
    msg: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
) => {    
    if (msg.selectedVowel) {
        hook_replaceVowels(msg.selectedVowel as string, document);
    }

    sendResponse("OK");
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

window.onload = (ev) => {
  console.log("window onload replacement:");
  loadSelectedVowel().then((vowel) => {
    if (vowel) {
      hook_replaceVowels(vowel, window.document);
    }
  });
}
