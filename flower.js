// COSTANTI

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
  'assets/10.jpeg',
];
const vowels = ['a', 'e', 'i', 'o', 'u'];

const replacement = 'replacement.html';
// FINE COSTANTI

// UTILS
function utilCapitalize(string) {
  if (!string) return '';
  return string[0].toUpperCase() + string.slice(1);
}

function utilShuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function utilSetVowel(string, vowel) {
  for (let i = 0; i < string.length; i++) {
    if (vowels.includes(string[i].toLowerCase())) {
      string[i] = vowel;
    }
  }
}

function utilInterval(func, timer) {
  let interval = undefined;

  if (interval) {
    this.clearInterval(interval);
    interval = this.setInterval(func, timer);
  } else {
    interval = this.setInterval(func, timer);
  }
}

//FINE UTILS

// FUNZIONI RICHIAMATE NEL BODY

function shuffleWords() {
  console.log('shuffle')
  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node;
  while ((node = textNodes.nextNode())) {
    const content = node.textContent.trim();
    const words = content.split(' ');
    // if (chars) {
    //   for (let i = 0; i < words.length; i++) {
    //     const chars = words[i].split('');
    //     utilShuffleArray(chars);
    //     const shuffledChars = utilCapitalize(chars.join().toLowerCase());
    //     words[i] = shuffledChars.replaceAll(',', '');
    //   }
    // }
    utilShuffleArray(words);
    node.textContent = words.join(' ');
  }
}

/* 
function replaceWords(replacement) {

  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node;
  while ((node = textNodes.nextNode())) {
    const content = node.textContent.trim();
    const words = content.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chars = words[i].split('')
      utilShuffleArray(chars)
      const shuffledChars = utilCapitalize(chars.join().toLowerCase())
      words[i] = shuffledChars.replaceAll(',', '')
    }
    utilShuffleArray(words)
    node.textContent = words.join(' ');
  }
} 
*/

function replaceVowel() {
  console.log('replace vocali')

  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const replacement = vowels[Math.floor(Math.random() * vowels.length)]
  let node;
  while ((node = textNodes.nextNode())) {
    const content = node.textContent.trim();
    const words = content.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chars = words[i].split('');
      utilSetVowel(chars, replacement);
      words[i] = utilCapitalize(chars.join().replaceAll(',', ''));
    }
    node.textContent = words.join(' ');
  }
}

function replaceBody() {
  console.log('replace body')
  utilInterval(() => {
    if (Math.random() < 0.1) {
      document.body.style.background = `url("${chrome.runtime.getURL(
        localImages[Math.floor(Math.random() * localImages.length )]
      )}")`;
      document.body.style.backgroundSize = 'contain';
      setTimeout(() => {
        document.body.style.backgroundImage = '';
      }, 20);
    }
  }, 5000)
}

// FINE FUNZIONI RICHIAMATE

// MAIN
function main() {
  const functions = [replaceBody, replaceVowel, shuffleWords]
  window.addEventListener('click', function () {
    functions[Math.floor(Math.random() * functions.length)]()
  });
}

main();
