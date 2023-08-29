
export const loadSelectedVowel = async () : Promise<string | undefined> => {
    const data = await chrome.storage.local.get(['selectedVowel']);
    if (data?.selectedVowel === '') {
        return undefined;
    }
    return data?.selectedVowel;
}

export const storeSelectedVowel = (vowel?: string) => {
    const selectedVowel = vowel?.toLowerCase() ?? '';
    console.log("Storing selected vowel: " + selectedVowel);
    chrome.storage.local.set({selectedVowel: selectedVowel})
}

export const resetSelectedVowel = () => {
    storeSelectedVowel(undefined);
}