import React, { useState, type ReactElement } from 'react';
import { sendMessageToActiveTab } from '../../utils/Utils';
import RangeSlider, { type HintEntry } from '../RangeSlider/RangeSlider';
import { LocalStorage } from '../../data/LocalStorage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const MARKS: Record<number, string> = {
  1: 'LOW',
  4: 'MEDIUM',
  7: 'HIGH',
  10: 'BALORDO'
};

const HINTS: HintEntry[] = [
  { from: 1, to: 3, hint: 'A little bit of shuffle, not too evident' },
  { from: 4, to: 6, hint: 'A medium amount of shuffle, the victim will say WTF quicker' },
  { from: 7, to: 9, hint: 'A lot of shuffle, the victim will be at vortexs' },
  { from: 10, to: 10, hint: 'OF A SHUFFLE LOT WHAT THE USER THE FUCK IMMEDIATELY SAY WILL' }
]

const WordsShufflerWidget = (props: { title?: string }): ReactElement => {
  const [shuffleWordsIntensity, setShuffleWordsIntensity] = useState<number | undefined>(undefined);

  const shuffleWordsInActiveTab = (shuffleWords: boolean) => async (): Promise<void> => {
    await sendMessageToActiveTab({ shuffleWords, shuffleWordsIntensity });
  }

  React.useEffect(() => {
    async function loadStorageAndShuffle (): Promise<void> {
      console.log('Loading storage config');
      const config = await LocalStorage.loadLocalStorageConfiguration();
      const intensity = config?.shuffleWordsIntensity ?? 10
      console.log(`shuffleWordsIntensity is ${config?.shuffleWordsIntensity ?? 'UNAVAILABLE'}; using value: ${intensity}`);
      setShuffleWordsIntensity(intensity);
      void shuffleWordsInActiveTab(true)
    }

    void loadStorageAndShuffle();
  }, [])

  React.useEffect(() => {
    console.log('Shuffle Words Intensity changed to: ' + shuffleWordsIntensity);
    if (shuffleWordsIntensity == null) {
      return;
    }
    async function applyChanges (): Promise<void> {
      if (shuffleWordsIntensity == null) {
        return;
      }
      await LocalStorage.storeShuttleIntensity(shuffleWordsIntensity)
      await chrome.tabs.reload();
      void shuffleWordsInActiveTab(true);
    }
    void applyChanges();
  }, [shuffleWordsIntensity])

  return (
    <>
        <h1>{props.title ?? 'Words Shuffler'}</h1>

        {shuffleWordsIntensity != null
          ? <RangeSlider
          marks={MARKS}
          hints={HINTS}
          defaultValue={shuffleWordsIntensity}
          onChange={(newValue) => {
            setShuffleWordsIntensity(newValue)
          }}/>
          : <LoadingIndicator isLoading={true}/>}
    </>
  );
}

export default WordsShufflerWidget;
