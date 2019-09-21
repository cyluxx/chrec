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
const iframes = [];

let stack = [];
let currentTarget = null;

// wait for document ready (without jQuery)
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    ready();
  });
}

function ready() {
  document.body.querySelectorAll('iframe').forEach(initIframe);

  addMutationObserver(document.body);
  trackMouseMovements(document.body);
  trackClicks(document.body);
  document.body.querySelectorAll('form').forEach(trackFormSubmits);
  document.body.querySelectorAll('input').forEach(trackInputChanges);
  document.body.querySelectorAll('select').forEach(trackSelectInputs);
}

function initIframe(iframe) {
  if (iframes.indexOf(iframe) > -1) {
    return;
  }

  iframes.push(iframe);
  addMutationObserver(iframe.contentDocument.body);

  iframe.addEventListener('mouseenter', function (e) {
    stack.unshift(this);
    iframe.contentDocument.querySelectorAll('iframe').forEach(initIframe);
    sendToHost({
      className: 'SwitchTo',
      locators: generateLocators(stack[0]),
      boundingBox: getBoundingClientRect()
    });
  });

  iframe.addEventListener('mouseleave', function (e) {
    if (stack.length > 0) {
      stack.shift();
      sendToHost({
        className: 'SwitchToParent',
        locators: generateLocators(stack[0]),
        boundingBox: getBoundingClientRect()
      });
    } else {
      sendToHost({
        type: 'SwitchToDefaultContent'
      });
    }
  });

  waitUntilIframeIsLoaded(iframe, () => {
    const doc = iframe.contentDocument;
    trackMouseMovements(doc);
    trackClicks(doc);
    doc.querySelectorAll('form').forEach(trackFormSubmits);
    doc.querySelectorAll('input').forEach(trackInputChanges);
    doc.querySelectorAll('select').forEach(trackSelectInputs);
  });
}

function trackMouseMovements(el) {
  el.addEventListener('mousemove', function (e) {
    if (currentTarget !== e.target) {
      currentTarget = e.target;
    }
  });
}

function trackClicks(el) {
  el.addEventListener('click', function (e) {
    sendToHost({
      className: 'Click',
      locators: generateLocators(this),
      boundingBox: currentTarget.getBoundingClientRect()
    });
  });
}

function trackFormSubmits(el) {
  el.addEventListener('submit', function (e) {
    sendToHost({
      className: 'Submit',
      locators: generateLocators(this),
      boundingBox: currentTarget.getBoundingClientRect()
    });
  });
}

function trackInputChanges(el) {
  let input = '';

  el.addEventListener('input', function (e) {
    input = this.value;
  });

  el.addEventListener('blur', function (e) {
    if (input === '') {
      sendToHost({
        className: 'Clear',
        locators: generateLocators(this),
        boundingBox: this.getBoundingClientRect()
      });
    } else {
      sendToHost({
        className: 'Type',
        locators: generateLocators(this),
        boundingBox: this.getBoundingClientRect(),
        value: this.value
      });
    }
  });
}

function trackSelectInputs(el) {
  el.addEventListener('change', function (e) {
    sendToHost({
      className: 'Select',
      locators: generateLocators(this),
      boundingBox: this.getBoundingClientRect(),
      value: this.value
    });
  });
}

function waitUntilIframeIsLoaded(iframe, fn) {
  const win = iframe.contentWindow;
  if (win && win.document && win.document.body && win.document.body.innerHTML) {
    fn();
    return;
  }

  window.setTimeout(() => {
    waitUntilIframeIsLoaded(iframe, fn);
  }, 100);
}

function addMutationObserver(target) {
  const mo = new MutationObserver((records, instance) => {
    console.log(records);
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {

        sendToHost({
          className: 'WaitForAddedHtmlElement',
          locators: generateLocators(node),
          boundingBox: node.getBoundingClientRect(),
          maxWaitTime: 3000
        });

        switch (node.nodeName) {
          case 'IFRAME':
            initIframe(node);
            break;
          case 'FORM':
            trackFormSubmits(node);
            break;
          case 'INPUT':
            trackInputChanges(node);
            break;
          case 'SELECT':
            trackSelectInputs(node);
            break;
          default:
            if (node.nodeName !== '#text') {
              node.querySelectorAll('iframe').forEach(initIframe);
              node.querySelectorAll('form').forEach(trackFormSubmits);
              node.querySelectorAll('input').forEach(trackInputChanges);
              node.querySelectorAll('select').forEach(trackSelectInputs);
            }
        }
      });

      record.removedNodes.forEach((node) => {
        sendToHost({
          className: 'WaitForRemovedHtmlElement',
          locators: generateLocators(node),
          boundingBox: node.getBoundingClientRect(),
          maxWaitTime: 3000
        });
      });

      // if (record.attributeName != null) {
      //   const node = record.target;
      //   sendToHost({
      //     className: 'WaitForHtmlElementAttribute',
      //     locators: generateLocators(node),
      //     boundingBox: node.getBoundingClientRect(),
      //     attribute: record.attributeName,
      //     value: node.getAttribute(record.attributeName),
      //     maxWaitTime: 3000
      //   });
      // }
    });
  });
  const options = {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };
  mo.observe(target, options);
}

function generateBasicCssSelector(el) {
  const names = [];
  while (el.parentNode) {
    if (el.id) {
      names.unshift('#' + el.id);
      break;
    } else {
      if (el === el.ownerDocument.documentElement) {
        names.unshift(el.tagName);
      } else {
        for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(el.tagName + ':nth-child(' + c + ')');
      }
      el = el.parentNode;
    }
  }
  return names.join(' > ');
}

function generateLocators(el) {
  let locators = [];

  locators.push({ method: 'Basic', className: 'CssLocator', value: generateBasicCssSelector(el) });
  locators.push({ method: 'CssSelectorGenerator', className: 'CssLocator', value: cssSelectorGenerator.getSelector(el) });
  locators.push({ method: 'Finder', className: 'CssLocator', value: myapi.finder(el) });
  locators.push({ method: 'GetQuerySelector', className: 'CssLocator', value: myapi.getQuerySelector(el) });
  locators.push({ method: 'OptimalSelect', className: 'CssLocator', value: myapi.select(el) });
  locators.push({ method: 'SelectorQuery', className: 'CssLocator', value: myapi.selectorQuery(el) });
  locators.push({ method: 'RobulaPlus', className: 'XpathLocator', value: robulaPlus.getRobustXPath(el, document) });

  return locators;
}

function sendToHost(message) {
  console.log('Sending ' + message.className + ' Action...');
  ipcRenderer.sendToHost(JSON.stringify(message));
}
