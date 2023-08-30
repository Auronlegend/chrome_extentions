import React, { type ReactElement } from 'react';
import { sendMessageToActiveTab } from '../../utils/Utils';

const shuffleWordsInActiveTab = (shuffle: boolean) => async (): Promise<void> => {
  await sendMessageToActiveTab({ shuffleWords: shuffle })
}

const WordsShuffler = (props: { title?: string }): ReactElement => {
  React.useEffect(() => {
    console.log('hello')
    void shuffleWordsInActiveTab(true)
  })
  console.log(props.title, 'aaaaaaaaaaaasjhsdjahjsdhj')
  return (
        <>
            <h1>{props.title ?? 'JSON Formatter'}</h1>
        </>
  );
}

export default WordsShuffler;
