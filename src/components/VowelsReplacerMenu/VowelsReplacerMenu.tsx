import { useEffect, useState } from "react";
import ButtonList from "../ButtonList/ButtonList";
import { loadSelectedVowel } from "../../data/LocalStorage";

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

const refreshPage = () => {
    // TODO: Not implemented
}

const storeSelectedVowel = (vowel?: string) => {
    const selectedVowel = vowel?.toLowerCase() ?? '';
    console.log("Storing selected vowel: " + selectedVowel);
    chrome.storage.local.set({selectedVowel: selectedVowel})
}

const replaceVowelsInActiveTab = (vowel: string) => {
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
     }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id || 0,
 
            // Message type
            { selectedVowel: vowel.toLowerCase() },
          
            // Callback executed when the content script sends a response
            (response: any) => {
                console.log("Received response " + response);
            }
        );
    });
}

const VowelsReplacerMenu = (props: {title?: string}) => {
    
    const [selectedVowel, setSelectedVowel] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function loadVowel() {
            const vowel = await loadSelectedVowel();
            setSelectedVowel(vowel);
        }

        loadVowel();
    });

    return (
    <>
        <h1>{props.title ?? 'MODOFOCO LO VOCOLO'}</h1>
            <ButtonList selectedButton={selectedVowel} buttons={VOWELS} onButtonSelected={(text: string) => {
                // If the vowel is already selected, we unselect it and store an undefined value
                if (selectedVowel?.toLowerCase() === text.toLowerCase()) {
                    storeSelectedVowel(undefined);
                    setSelectedVowel(undefined);
                    refreshPage();
                    return;
                }
                storeSelectedVowel(text);
                setSelectedVowel(text);
                replaceVowelsInActiveTab(text);
            }}/>
    </>
    );
}

export default VowelsReplacerMenu;