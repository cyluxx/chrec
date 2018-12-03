const { ipcRenderer } = require('electron');
const CssSelectorGenerator = require('css-selector-generator').CssSelectorGenerator;
const finder = require('@medv/finder').default;
const getQuerySelector = require('get-query-selector');
const optimalSelect = require('optimal-select').select;
const selectorQuery = require('selector-query');

const clickableElements = 'a, button';
const readableElements = 'div, h1, h2, h3, h4, h5, h6, label, li, p, span';
const typeableElements = 'input, textarea';

global.myapi = {
    CssSelectorGenerator: CssSelectorGenerator,
    finder: finder,
    getQuerySelector: getQuerySelector,
    select: optimalSelect,
    selectorQuery: selectorQuery
}
const cssSelectorGenerator = new myapi.CssSelectorGenerator;

const mutationObserver = new MutationObserver(() => {
    window.eventRecorder = new EventRecorder();
});

const sendClick = (event) => {
    console.log('Preload: click event triggered');
    let message = {
        action: 'click',
        selectors: generateSelectors(event),
        boundingBox: event.target.getBoundingClientRect()
    }
    sendAction(message);
}

const sendRead = (event) => {
    console.log('Preload: read event triggered');
    let message = {
        action: 'read',
        selectors: generateSelectors(event),
        value: window.getSelection().toString(),
        boundingBox: event.target.getBoundingClientRect()
    }
    sendAction(message);
}

const sendType = (event) => {
    console.log('Preload: type event triggered');
    let message = {
        action: 'type',
        selectors: generateSelectors(event),
        value: event.target.value,
        type: event.type,
        keyCode: event.keyCode,
        boundingBox: event.target.getBoundingClientRect()
    }
    sendAction(message);
}

function sendAction(message) {
    ipcRenderer.sendToHost(JSON.stringify(message));
}

function sendInfo(message) {
    ipcRenderer.sendToHost(JSON.stringify({ info: true, message: message }));
}

function generateSelectors(event) {
    let selectors = [];

    sendInfo('cssSelectorGenerator');
    selectors.push(cssSelectorGenerator.getSelector(event.target));

    sendInfo('finder');
    selectors.push(myapi.finder(event.target));

    sendInfo('getQuerySelector');
    selectors.push(myapi.getQuerySelector(event.target));

    sendInfo('optimalSelect');
    selectors.push(myapi.select(event.target));

    sendInfo('selectorQuery');
    selectors.push(myapi.selectorQuery(event.target));

    return selectors;
}

class EventRecorder {
    constructor() {
        this.clickableElements = document.querySelectorAll(clickableElements);
        this.readableElements = document.querySelectorAll(readableElements);
        this.typeableElements = document.querySelectorAll(typeableElements);

        this.addEventListeners();
    }

    addEventListeners() {
        for (let element of this.clickableElements) {
            element.addEventListener('click', sendClick);
        }
        for (let element of this.readableElements) {
            element.addEventListener('mouseup', sendRead);
        }
        for (let element of this.typeableElements) {
            element.addEventListener('focusout', sendType);
        }
    }

    //removeEventListeners??
}

// wait for document ready (without jQuery)
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        ready();
    });
}

function ready() {
    window.eventRecorder = new EventRecorder();
    mutationObserver.observe(document, { attributes: true, childList: true, subtree: true });
}