const VOWELS = ['a', 'e', 'i', 'o', 'u', 'è', 'é'];

const isUpperCase = (str: string) => /^[A-Z]*$/.test(str);

const charToVowelLambda = (vowel:string) => (ch: string) => VOWELS.includes(ch.toLowerCase()) ?
  (isUpperCase(ch) ? vowel.toUpperCase() : vowel) : 
  ch;

const replaceVowelsInText = (text: string, vowel: string) => text.split('')
  .map(charToVowelLambda(vowel))
  .join('')

const getTextNodes = (parent: HTMLElement | Node) => {
  console.log("Getting text nodes");
  const walker = document.createTreeWalker(
    parent,
    NodeFilter.SHOW_TEXT,
    null
  );
  const textNodes = [];

  let node = undefined
  while (node = walker.nextNode()) {
    console.log("Node: ");
    console.log(node);
    textNodes.push(node);
  }
  return textNodes;
}

export const replaceVowelsInDocument = (root: HTMLElement | Node, vowel: string) => {
  console.log("Replacing all vowels with: " + vowel);
  getTextNodes(root).forEach((element) => {
    if (element.nodeType === Node.TEXT_NODE) {
      element.textContent = replaceVowelsInText(element.textContent ?? '', vowel);
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      replaceVowelsInDocument(element, vowel);
    }
  })
}