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
    window.eventRecorder.removeEventListeners();
    window.eventRecorder = new EventRecorder();
    window.eventRecorder.addEventListeners();
});

var eventTargetValueString = '';
var previousEventTargetValueString = '';
var currentSelection = '';

const sendClick = (event) => {
    let message = {
        action: 'click',
        selectors: generateSelectors(event),
        boundingBox: event.target.getBoundingClientRect()
    }
    sendAction(message);
}

const sendMouseup = (event) => {
    event.stopPropagation();
    let selection = window.getSelection().toString();
    if (selection && selection !== currentSelection) {
        let message = {
            action: 'read',
            selectors: generateSelectors(event),
            value: selection,
            boundingBox: event.target.getBoundingClientRect()
        }
        sendAction(message);
        currentSelection = selection;
    }
}

const sendKeyup = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
        let message = {
            action: 'type',
            selectors: generateSelectors(event),
            value: eventTargetValueString,
            type: event.type,
            key: event.key,
            boundingBox: event.target.getBoundingClientRect()
        }
        if (previousEventTargetValueString !== eventTargetValueString) {
            sendAction(message);
        }
    }
    else {
        eventTargetValueString = event.target.value;
    }
}

const sendFocusout = (event) => {
    let message = {
        action: 'type',
        selectors: generateSelectors(event),
        value: eventTargetValueString,
        type: event.type,
        key: event.key,
        boundingBox: event.target.getBoundingClientRect()
    }
    if (previousEventTargetValueString !== eventTargetValueString) {
        sendAction(message);
    }
}

function sendAction(message) {
    console.log('Preload: Sending ' + message.action + ' message...');
    ipcRenderer.sendToHost(JSON.stringify(message));
    previousEventTargetValueString = eventTargetValueString;
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
            element.addEventListener('mouseup', sendMouseup);
        }
        for (let element of this.typeableElements) {
            element.addEventListener('keyup', sendKeyup);
            element.addEventListener('focusout', sendFocusout);
        }
    }

    removeEventListeners() {
        for (let element of this.clickableElements) {
            element.removeEventListener('click', sendClick);
        }
        for (let element of this.readableElements) {
            element.addEventListener('mouseup', sendMouseup);
        }
        for (let element of this.typeableElements) {
            element.removeEventListener('keyup', sendKeyup);
            element.removeEventListener('focusout', sendFocusout);
        }
    }
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