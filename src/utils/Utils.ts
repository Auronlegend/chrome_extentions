export const shuffleArrayWithIntensity = (array: any[], intensity: number): any[] => {
  array.forEach((_, i) => {
    const rnd = Math.random() * 9; // Random number from 0 to 9
    if (rnd > intensity) {
      return; // Skip this shuffle - if intensity = 10 it is always false
    }
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });
  return array;
}

export const shuffleArray = (array: any[]): any[] => {
  array.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  });
  return array;
};

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

export const getNodesByFilter = (parent: HTMLElement | Node, filterMode: keyof typeof NodeFilter): Node[] => {
  const walker = document.createTreeWalker(
    parent,
    NodeFilter[filterMode],
    {
      acceptNode: function (node: Node) {
        if (filterMode === 'SHOW_TEXT' && ['SCRIPT', 'STYLE'].includes(node.parentNode?.nodeName.toUpperCase() ?? '')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (filterMode === 'SHOW_ALL' && !['DIV', 'IMG'].includes(node.nodeName.toUpperCase() ?? '')) {
          return NodeFilter.FILTER_ACCEPT;
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
