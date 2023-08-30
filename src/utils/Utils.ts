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

export const getTextNodes = (parent: HTMLElement | Node): Node[] => {
  const walker = document.createTreeWalker(
    parent,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node: Node) {
        if (['SCRIPT', 'STYLE'].includes(node.parentNode?.nodeName.toUpperCase() ?? '')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  const textNodes = [];

  let node
  while ((node = walker.nextNode()) != null) {
    textNodes.push(node);
  }
  return textNodes;
}
