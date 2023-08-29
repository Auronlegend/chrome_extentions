import { useEffect, useState } from "react";
import ButtonList from "../ButtonList/ButtonList";
import { loadSelectedVowel, resetSelectedVowel, storeSelectedVowel } from "../../data/LocalStorage";
import { sendMessageToActiveTab } from "../../utils/Utils";

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

const refreshPage = () => {
    // TODO: Not implemented
}

const replaceVowelsInActiveTab = (vowel: string) => {
    sendMessageToActiveTab({selectedVowel: vowel.toLowerCase()})
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
                    resetSelectedVowel();
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