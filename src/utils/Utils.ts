
export const sendMessageToActiveTab = async (msg: any)=> {
    return new Promise((resolve) => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
         }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id || 0, msg, (response: any) => {
                resolve(response);
            });
        });
    });
}