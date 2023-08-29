
export const loadSelectedVowel = async () : Promise<string | undefined> => {
    const data = await chrome.storage.local.get(['selectedVowel']);
    console.log("Loaded data from storage:");
    console.log(data);
    if (data?.selectedVowel === '') {
        return undefined;
    }
    return data?.selectedVowel;
}