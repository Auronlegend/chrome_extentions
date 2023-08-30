import './App.css';
// import VowelsReplacerMenu from './components/VowelsReplacerMenu/VowelsReplacerMenu';
import React, { type ReactElement } from 'react';
import WordsShuffler from './components/WordsShuffler/WordsShuffler';

function App (): ReactElement {
  console.log('app init')
  return (
    <div className="App">
        <WordsShuffler title='JSON Formatter' />
    </div>
  );
}

export default App;
