const dataTestComponentClassName = 'e4VJZ';

const CHARACTER_SELECT = "characterSelect";
const CHARACTER_MATCH = 'characterMatch';

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
            return { choices, correctIndex };
        case CHARACTER_MATCH:
            const { pairs } = challenge;
            return pairs;
        default:
            break;
    }
    // document.querySelector("#root > div > div > div > div > div._2Fc1K > div > div > div._10vOG > button").click()
}

solveChallenge();