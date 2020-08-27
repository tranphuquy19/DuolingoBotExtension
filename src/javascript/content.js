chrome.runtime.sendMessage({ todo: "activeApplication" });

chrome.runtime.onMessage.addListener(({ tabId }) => {
});

function FindReactElement(node) {
    return node[
        Object.keys(node).filter(function (_, i) {
            return _.startsWith('__reactInternalInstance$');
        })[0]
    ];
}

setInterval(() => {

    let e = document.getElementsByClassName('e4VJZ')[0];

    let c = FindReactElement(e);
    console.log(c);
}, 5000);