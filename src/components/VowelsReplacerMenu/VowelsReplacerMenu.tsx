import React, { type ReactElement, useEffect, useState } from 'react';
import ButtonList from '../ButtonList/ButtonList';
import { sendMessageToActiveTab } from '../../utils/Utils';
import { LocalStorage } from '../../data/LocalStorage';
import { replaceVowelsInText } from '../../features/VowelsReplacer';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

const refreshPage = (): void => {
  void chrome.tabs.reload();
}

const replaceVowelsInActiveTab = async (vowel: string): Promise<void> => {
  await sendMessageToActiveTab({ selectedVowel: vowel.toLowerCase() })
}

const VowelsReplacerMenu = (props: { title?: string }): ReactElement => {
  const [selectedVowel, setSelectedVowel] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadVowel (): Promise<void> {
      const vowel = await LocalStorage.loadSelectedVowel();
      setSelectedVowel(vowel);
    }

    void loadVowel();
  });

  const getTitle = (): string => {
    const title = props.title ?? 'MODIFICA LE VOCALI';
    if (selectedVowel !== undefined) {
      return replaceVowelsInText(title, selectedVowel);
    }
    return title;
  }

  return (
    <>
        <h1>{getTitle()}</h1>
            <ButtonList selectedButton={selectedVowel} buttons={VOWELS} onButtonSelected={(text: string) => {
              // If the vowel is already selected, we unselect it and store an undefined value
              if (selectedVowel?.toLowerCase() === text.toLowerCase()) {
                void LocalStorage.resetSelectedVowel();
                setSelectedVowel(undefined);
                refreshPage();
                return;
              }
              void LocalStorage.storeSelectedVowel(text);
              setSelectedVowel(text);
              void replaceVowelsInActiveTab(text);
            }}/>
    </>
  );
}

export default VowelsReplacerMenu;
