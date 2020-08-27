chrome.runtime.sendMessage({ todo: "activeApplication" });

const dataTestComponentClassName = "e4VJZ";

const CHARACTER_SELECT = "characterSelect";
const CHARACTER_MATCH = "characterMatch";
const TRANSLATE = "translate";
const LISTEN_TAP = "listenTap";
const NAME = "name";
const COMPLETE_REVERSE_TRANLATION = "completeReverseTranslation";
const LISTEN = "listen";

function getChallenge() {
    const dataTestDOM = document.getElementsByClassName(dataTestComponentClassName)[0];
    const dataTestAtrr = Object.keys(dataTestDOM).filter(att => /^__reactInternalInstance/g.test(att))[0];
    const childDataTestProps = dataTestDOM[dataTestAtrr].memoizedProps.children.props;
    const { challenge } = childDataTestProps;
    return challenge;
}

function solveChallenge() {
    const challenge = getChallenge();
    switch (challenge.type) {
        case CHARACTER_SELECT:
            const { choices, correctIndex } = challenge;
            return { choices, correctIndex }; // trắc nghiệm 1 đáp án

        case CHARACTER_MATCH:
            const { pairs } = challenge;
            return pairs; // tập hợp các cặp thẻ

        case TRANSLATE: // nhập đán án
        case NAME:
            const { correctSolutions } = challenge;
            return correctSolutions[0]; // nhập đáp án

        case COMPLETE_REVERSE_TRANLATION:
            const { displayTokens } = challenge;
            return displayTokens.filter(token => token.isBlank)[0]; // điền vào từ còn thiếu

        case LISTEN_TAP:
        case LISTEN:
            const { prompt } = challenge;
            return prompt; // nghe và điền vào ô input

        default:
            break;
    }
    // document.querySelector("#root > div > div > div > div > div._2Fc1K > div > div > div._10vOG > button").click()
    // document.dispatchEvent(new KeyboardEvent('keydown', {'keyCode':13, 'which':13}))
}

window.getChallenge = getChallenge;
window.solveChallenge = solveChallenge;

chrome.runtime.onMessage.addListener(message => {
    console.log(message);
    solveChallenge();
});