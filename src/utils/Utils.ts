export const sendMessageToActiveTab = async (msg: any): Promise<any> => {
  return await new Promise((resolve) => {
    (chrome.tabs !== undefined) && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id ?? 0, msg, (response: any) => {
        resolve(response);
      });
    });
  });
}
