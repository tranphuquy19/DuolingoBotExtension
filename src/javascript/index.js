const dataTestComponentClassName = 'e4VJZ';

const TIME_OUT = 750;

const CHARACTER_SELECT = 'characterSelect';
const CHARACTER_MATCH = 'characterMatch'; // not yet
const TRANSLATE = 'translate';
const LISTEN_TAP = 'listenTap';
const NAME = 'name';
const COMPLETE_REVERSE_TRANLATION = 'completeReverseTranslation';
const LISTEN = 'listen';
const SELECT = 'select';
const JUDGE = 'judge';
const FORM = 'form';
const LISTEN_COMPREHENSION = 'listenComprehension';
const READ_COMPREHENSION = 'readComprehension';
const CHARACTER_INTRO = 'characterIntro';
const DIALOGUE = 'dialogue';

const CHALLENGE_CHOICE_CARD = '[data-test="challenge-choice-card"]';
const CHALLENGE_CHOICE = '[data-test="challenge-choice"]';
const CHALLENGE_TRANSLATE_INPUT = '[data-test="challenge-translate-input"]';
const CHALLENGE_LISTEN_TAP = '[data-test="challenge-listenTap"]';
const CHALLENGE_JUDGE_TEXT = '[data-test="challenge-judge-text"]';
const CHALLENGE_TEXT_INPUT = '[data-test="challenge-text-input"]';
const CHALLENGE_TAP_TOKEN = '[data-test="challenge-tap-token"]';
const PLAYER_NEXT = '[data-test="player-next"]';

function getChallengeObj(theObject) {
    let result = null;
    if(theObject instanceof Array) {
        for(let i = 0; i < theObject.length; i++) {
            result = getChallengeObj(theObject[i]);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(let prop in theObject) {
            if(prop == 'challenge') {
                if(typeof theObject[prop] == 'object') {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getChallengeObj(theObject[prop]);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}

function getChallenge() {
    // const dataTestComponentClassName = 'e4VJZ';
    const dataTestDOM = document.getElementsByClassName(dataTestComponentClassName)[0];
    const dataTestAtrr = Object.keys(dataTestDOM).filter(att => /^__reactProps/g.test(att))[0];
    const childDataTestProps = dataTestDOM[dataTestAtrr];
    const { challenge } = getChallengeObj(childDataTestProps);
    console.log(challenge)
    return challenge;
}

function pressEnter() {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': 13, 'which': 13 }));
}

function dynamicInput(element, msg) {
    let input = element;
    let lastValue = input.value;
    input.value = msg;
    let event = new Event('input', { bubbles: true });
    // hack React15
    event.simulated = true;
    // hack React16 内部定义了descriptor拦截value，此处重置状态
    let tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
}

function classify() {
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    const challenge = getChallenge();
    switch (challenge.type) {
        case READ_COMPREHENSION:
        case LISTEN_COMPREHENSION:
        case FORM: { // trắc nghiệm 1 đáp án
            const { choices, correctIndex } = challenge;
            document.querySelectorAll(CHALLENGE_CHOICE)[correctIndex].dispatchEvent(clickEvent);
            return { choices, correctIndex };
        }

        case SELECT:
        case CHARACTER_SELECT: { // trắc nghiệm 1 đáp án
            const { choices, correctIndex } = challenge;
            document.querySelectorAll(CHALLENGE_CHOICE_CARD)[correctIndex].dispatchEvent(clickEvent);
            return { choices, correctIndex };
        }

        case CHARACTER_MATCH: {// tập hợp các cặp thẻ
            const { pairs } = challenge;
            return pairs;
        }

        case TRANSLATE:
        case NAME: { // nhập đán án
            const { correctSolutions } = challenge;
            let textInputElement = document.querySelectorAll(CHALLENGE_TRANSLATE_INPUT)[0];
            let correctSolution = correctSolutions[0];
            dynamicInput(textInputElement, correctSolution);
            return correctSolutions[0];
        }

        case COMPLETE_REVERSE_TRANLATION: { // điền vào từ còn thiếu
            const { displayTokens } = challenge;
            const { text } = displayTokens.filter(token => token.isBlank)[0];
            let textInputElement = document.querySelectorAll(CHALLENGE_TEXT_INPUT)[0];
            dynamicInput(textInputElement, text);
            return text;
        }

        case LISTEN_TAP: 
        case LISTEN: { // nghe và điền vào ô input
            const { prompt } = challenge;
            let textInputElement = document.querySelectorAll(CHALLENGE_TRANSLATE_INPUT)[0];
            dynamicInput(textInputElement, prompt);
            return prompt;
        }

        case JUDGE: { // trắc nghiệm 1 đáp án
            const { correctIndices } = challenge;
            document.querySelectorAll(CHALLENGE_JUDGE_TEXT)[correctIndices[0]].dispatchEvent(clickEvent);
            return correctIndices;
        }

        case DIALOGUE:
        case CHARACTER_INTRO: { // trắc nghiệm 1 đáp án
            const { choices, correctIndex } = challenge;
            document.querySelectorAll(CHALLENGE_JUDGE_TEXT)[correctIndex].dispatchEvent(clickEvent);
            return { choices, correctIndex };
        }

        default:
            break;
    }
}

function main() {
    try {
        let isPlayerNext = document.querySelectorAll(PLAYER_NEXT)[0].textContent.toUpperCase();
        if (isPlayerNext.valueOf() !== 'CONTINUE') {
            classify();
            pressEnter();
        }
        setTimeout(pressEnter, 150);
    } catch (e) {
        console.log(e);
    }
}

function solveChallenge() {
    setInterval(main, TIME_OUT);
}

// solveChallenge();
(solveChallenge)();
