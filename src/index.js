const dataTestComponentClassName = "e4VJZ";

const CHARACTER_SELECT = "characterSelect";
const CHARACTER_MATCH = "characterMatch";
const TRANSLATE = "translate";
const LISTIEN_TAP = "listenTap";

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
        case TRANSLATE:
            const { correctTokens } = challenge;
            return correctTokens[0]; // nhập đáp án
        case LISTIEN_TAP:
            const { correctTokens } = challenge;
            return correctTokens[0];
        default:
            break;
    }
    // document.querySelector("#root > div > div > div > div > div._2Fc1K > div > div > div._10vOG > button").click()
}

solveChallenge();