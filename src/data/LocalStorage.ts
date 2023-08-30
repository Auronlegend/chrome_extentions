import type LocalStorageConfiguration from '../models/LocalStorageConfiguration';

const loadLocalStorageConfiguration = async (): Promise<LocalStorageConfiguration | undefined> => {
  return await chrome.storage.local.get(null) as LocalStorageConfiguration;
}

const loadSelectedVowel = async (): Promise<string | undefined> => {
  const data = await loadLocalStorageConfiguration();
  if (data?.selectedVowel === undefined || data?.selectedVowel === '') {
    return undefined;
  }
  return data?.selectedVowel;
}

const storeVowelReplaceEnabled = async (enabled: boolean): Promise<void> => {
  await chrome.storage.local.set({ featuresEnabled: { VOWELS: enabled } })
}

const storeShuttleEnabled = async (enabled: boolean): Promise<void> => {
  await chrome.storage.local.set({ featuresEnabled: { SHUTTLE: enabled } })
}

const storeSelectedVowel = async (vowel?: string): Promise<void> => {
  const selectedVowel = vowel?.toLowerCase() ?? '';
  console.log('Storing selected vowel: ' + selectedVowel);
  await chrome.storage.local.set({ selectedVowel })
}

const resetSelectedVowel = async (): Promise<void> => {
  await storeSelectedVowel(undefined);
}

export const LocalStorage = {
  loadLocalStorageConfiguration,
  loadSelectedVowel,
  storeVowelReplaceEnabled,
  storeShuttleEnabled,
  storeSelectedVowel,
  resetSelectedVowel
}
