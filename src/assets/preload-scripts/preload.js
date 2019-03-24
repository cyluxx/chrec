const { ipcRenderer } = require('electron');
const CssSelectorGenerator = require('css-selector-generator').CssSelectorGenerator;
const finder = require('@medv/finder').default;
const getQuerySelector = require('get-query-selector');
const optimalSelect = require('optimal-select').select;
const selectorQuery = require('selector-query');
const RobulaPlus = require('./robula-plus/robula-plus').RobulaPlus;

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

var eventTargetValueString = '';
var previousEventTargetValueString = '';
var currentSelection = '';

const sendClick = (e) => {
  e = e || window.event;
  var target = e.target || e.srcElement,
    text = target.textContent || target.innerText;
  console.log(target);
  console.log(text);
  const message = {
    className: 'Click',
    locators: generateLocators(event),
    boundingBox: target.getBoundingClientRect()
  }
  sendAction(message);
};

const sendMouseup = (event) => {
  event.stopPropagation();
  let selection = window.getSelection().toString();
  if (selection && selection !== currentSelection) {
    let message = {
      action: 'read',
      locators: generateLocators(event),
      value: selection,
      boundingBox: event.target.getBoundingClientRect()
    }
    sendAction(message);
    currentSelection = selection;
  }
};

const sendKeyup = (event) => {
  if (event.key === 'Enter' || event.key === 'Tab') {
    let message = {
      action: 'type',
      locators: generateLocators(event),
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
};

const sendFocusout = (event) => {
  let message = {
    action: 'type',
    locators: generateLocators(event),
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
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('click', sendClick, false);
  }

  removeEventListeners() {
    document.removeEventListener('click', sendClick, false);
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
