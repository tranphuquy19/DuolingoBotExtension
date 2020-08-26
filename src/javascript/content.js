chrome.runtime.sendMessage({ todo: "activeApplication" });

chrome.runtime.onMessage.addListener(message => {
    console.log(message);
});