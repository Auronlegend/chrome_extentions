import './App.css';
import VowelsReplacerMenu from './components/VowelsReplacerMenu/VowelsReplacerMenu';
import React, { type ReactElement } from 'react';

function App (): ReactElement {
  return (
    <div className="App">
        <VowelsReplacerMenu/>
    </div>
  );
}

export default App;
