import React, { type ReactElement, useEffect, useState } from 'react';
import ButtonList from '../ButtonList/ButtonList';
import { loadSelectedVowel, resetSelectedVowel, storeSelectedVowel } from '../../data/LocalStorage';
import { sendMessageToActiveTab } from '../../utils/Utils';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

const refreshPage = (): void => {
  // TODO: Not implemented
}

const replaceVowelsInActiveTab = async (vowel: string): Promise<void> => {
  await sendMessageToActiveTab({ selectedVowel: vowel.toLowerCase() })
}

const VowelsReplacerMenu = (props: { title?: string }): ReactElement => {
  const [selectedVowel, setSelectedVowel] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadVowel (): Promise<void> {
      const vowel = await loadSelectedVowel();
      setSelectedVowel(vowel);
    }

    void loadVowel();
  });

  return (
    <>
        <h1>{props.title ?? 'MODOFOCO LO VOCOLO'}</h1>
            <ButtonList selectedButton={selectedVowel} buttons={VOWELS} onButtonSelected={(text: string) => {
              // If the vowel is already selected, we unselect it and store an undefined value
              if (selectedVowel?.toLowerCase() === text.toLowerCase()) {
                void resetSelectedVowel();
                setSelectedVowel(undefined);
                refreshPage();
                return;
              }
              void storeSelectedVowel(text);
              setSelectedVowel(text);
              void replaceVowelsInActiveTab(text);
            }}/>
    </>
  );
}

export default VowelsReplacerMenu;
