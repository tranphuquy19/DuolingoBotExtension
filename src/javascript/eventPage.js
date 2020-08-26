chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log({ req, sender, res });
    if (req.todo === "activeApplication") {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const { tab, url, origin } = sender;
            const { id } = tab;
            chrome.pageAction.show(id);
            if (url.includes("skill", origin.length - 1)) {
                chrome.tabs.sendMessage(id, {
                    todo: "solveChallenge",
                    tabId: id
                });
            }
        });
    }
})

