export const loadSelectedVowel = async (): Promise<string | undefined> => {
  const data = await chrome.storage.local.get(['selectedVowel']);
  if (data?.selectedVowel === '') {
    return undefined;
  }
  return data?.selectedVowel;
}

export const storeSelectedVowel = async (vowel?: string): Promise<void> => {
  const selectedVowel = vowel?.toLowerCase() ?? '';
  console.log('Storing selected vowel: ' + selectedVowel);
  await chrome.storage.local.set({ selectedVowel })
}

export const resetSelectedVowel = async (): Promise<void> => {
  await storeSelectedVowel(undefined);
}
