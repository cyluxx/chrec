const { ipcRenderer } = require('electron');
const CssSelectorGenerator = require('css-selector-generator').CssSelectorGenerator;
const finder = require('@medv/finder').default;
const getQuerySelector = require('get-query-selector');
const optimalSelect = require('optimal-select').select;
const selectorQuery = require('selector-query');
const RobulaPlus = require('./robula-plus/robula-plus').RobulaPlus;

const clickableElements = 'a, button, input[type=checkbox]';
const readableElements = 'div, h1, h2, h3, h4, h5, h6, label, li, p, span';
const typeableElements = 'input, textarea';

global.myapi = {
  CssSelectorGenerator: CssSelectorGenerator,
  finder: finder,
  getQuerySelector: getQuerySelector,
  select: optimalSelect,
  selectorQuery: selectorQuery,
  RobulaPlus: RobulaPlus
}
const cssSelectorGenerator = new myapi.CssSelectorGenerator;
const robulaPlus = new myapi.RobulaPlus;

const mutationObserver = new MutationObserver(() => {
  window.eventRecorder.removeEventListeners();
  window.eventRecorder = new EventRecorder();
});

let eventTargetValueString = '';
let previousEventTargetValueString = '';
let currentSelection = '';

let currentElement = null;

const sendClick = (event) => {
  event = event || window.event;
  let target = event.target || event.srcElement;
  if (!currentElement) {
    event.preventDefault();
    console.log('ping');
    target.style.outline = '#f00 solid 2px';
    const message = {
      className: 'Click',
      locators: generateLocators(event),
      boundingBox: target.getBoundingClientRect(),
      target: target
    }
    sendAction(message);
    currentElement = target;
  } else {
    console.log('poooong');
    currentElement.style.outline = null;
    currentElement = null;
  }
};

const sendMouseup = (event) => {
  event = event || window.event;
  let target = event.target || event.srcElement;
  event.stopPropagation();
  const selection = window.getSelection().toString();
  if (selection && selection !== currentSelection) {
    let message = {
      className: 'Read',
      locators: generateLocators(event),
      boundingBox: target.getBoundingClientRect(),
      value: selection
    }
    sendAction(message);
    currentSelection = selection;
  }
};

const sendKeyup = (event) => {
  event = event || window.event;
  let target = event.target || event.srcElement;
  if (event.key === 'Enter') {
    const message = {
      className: 'Type',
      locators: generateLocators(event),
      boundingBox: target.getBoundingClientRect(),
      value: eventTargetValueString,
      key: '\\ue007'
    };
    if (previousEventTargetValueString !== eventTargetValueString) {
      sendAction(message);
    }
  } else if (event.key === 'Tab') {
    const message = {
      className: 'Type',
      locators: generateLocators(event),
      boundingBox: target.getBoundingClientRect(),
      value: eventTargetValueString,
      key: '\\ue004'
    };
    if (previousEventTargetValueString !== eventTargetValueString) {
      sendAction(message);
    }
  } else {
    eventTargetValueString = target.value;
  }
}

const sendFocusout = (event) => {
  let target = event.target || event.srcElement;
  let message = {
    className: 'Type',
    locators: generateLocators(event),
    boundingBox: target.getBoundingClientRect(),
    value: eventTargetValueString,
    key: ''
  }
  if (previousEventTargetValueString !== eventTargetValueString) {
    sendAction(message);
  }
}

function sendAction(message) {
  console.log('Preload: Sending ' + message.className + ' message...');
  ipcRenderer.sendToHost(JSON.stringify(message));
  previousEventTargetValueString = eventTargetValueString;
}

function generateLocators(event) {
  let locators = [];
  let locator;

  locator = cssSelectorGenerator.getSelector(event.target);
  locators.push({ methodName: 'CssSelectorGenerator', className: 'CssLocator', value: locator });

  locator = myapi.finder(event.target);
  locators.push({ methodName: 'Finder', className: 'CssLocator', value: locator });

  locator = myapi.getQuerySelector(event.target);
  locators.push({ methodName: 'GetQuerySelector', className: 'CssLocator', value: locator });

  locator = myapi.select(event.target)
  locators.push({ methodName: 'OptimalSelect', className: 'CssLocator', value: locator });

  locator = myapi.selectorQuery(event.target);
  locators.push({ methodName: 'SelectorQuery', className: 'CssLocator', value: locator });

  locator = robulaPlus.getRobustXPath(event.target, document);
  locators.push({ methodName: 'RobulaPlus', className: 'XpathLocator', value: locator });

  return locators;
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

  ipcRenderer.on('pageCaptured', (event, args) => {
    switch (args.className) {
      case 'Click':
        console.log('pingpong')
        currentElement.click();
        break;

      default:
        break;
    }
  });
}
