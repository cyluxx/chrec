const { ipcRenderer } = require('electron');
const CssSelectorGenerator = require('css-selector-generator').CssSelectorGenerator;
const finder = require('@medv/finder').default;
const getQuerySelector = require('get-query-selector');
const optimalSelect = require('optimal-select').select;
const selectorQuery = require('selector-query');

global.myapi = {
    CssSelectorGenerator: CssSelectorGenerator,
    finder: finder,
    getQuerySelector: getQuerySelector,
    select: optimalSelect,
    selectorQuery: selectorQuery
}

var cssSelectorGenerator = new myapi.CssSelectorGenerator;

// wait for document ready (without jQuery)
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function generateSelectors(event) {
    return [
        cssSelectorGenerator.getSelector(event.target),
        myapi.finder(event.target),
        myapi.getQuerySelector(event.target),
        myapi.select(event.target),
        myapi.selectorQuery(event.target)
    ];
}

ready(function () {
    const typeableElements = document.querySelectorAll('input, textarea');
    const clickableElements = document.querySelectorAll('a, button');

    // click
    for (let element of clickableElements) {
        element.addEventListener('click', function (event) {
            let send = {
                action: 'click',
                selectors: generateSelectors(event),
                boundingBox: event.target.getBoundingClientRect()
            }
            ipcRenderer.sendToHost(JSON.stringify(send));
        });
    }

    // read
    document.addEventListener("mouseup", function (event) {
        let value = window.getSelection().toString();
        if (value) {
            let send = {
                action: 'read',
                selectors: generateSelectors(event),
                value: value,
                boundingBox: event.target.getBoundingClientRect()
            }
            ipcRenderer.sendToHost(JSON.stringify(send));
        }
    });

    // type
    for (let element of typeableElements) {
        element.addEventListener('focusout', function (event) {
            let send = {
                action: 'type',
                selectors: generateSelectors(event),
                value: event.target.value,
                type: event.type,
                keyCode: event.keyCode,
                boundingBox: event.target.getBoundingClientRect()
            }
            ipcRenderer.sendToHost(JSON.stringify(send));
        });
    }
});