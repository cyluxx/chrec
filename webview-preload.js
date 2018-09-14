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

function sendMessage(event) {
    let send = {
        selectors: [
            cssSelectorGenerator.getSelector(event.target),
            myapi.finder(event.target),
            myapi.getQuerySelector(event.target),
            myapi.select(event.target),
            myapi.selectorQuery(event.target)
        ],
        value: event.target.value,
        type: event.type,
        keyCode: event.keyCode,
        boundingBox: event.target.getBoundingClientRect()
    }
    console.log(send);
    ipcRenderer.sendToHost(JSON.stringify(send));
}

// wait for document ready (without jQuery)
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    const typeableElements = document.querySelectorAll('input, textarea');
    const clickableElements = document.querySelectorAll('a, button');

    for (let element of typeableElements) {
        let prevent = true;
        element.addEventListener('focusout', function (event) {
            if(prevent){
                event.preventDefault();
                if (element.style.outline == null || element.style.outline == '') {
                    element.style.outline = '#f00 solid 2px';
                    sendMessage(event);
                    element.focusout();
                }
                else {
                    ipcRenderer.on('ok', () => {
                        element.style.outline = null;
                        prevent = false;
                        element.focusout();
                    });
                }
            }
        });  
    }

    for (let element of clickableElements) {
        let prevent = true;
        element.addEventListener('click', function (event) {
            if(prevent){
                event.preventDefault();
                if (element.style.outline == null || element.style.outline == '') {
                    element.style.outline = '#f00 solid 2px';
                    sendMessage(event);
                    element.click();
                }
                else {
                    ipcRenderer.on('ok', () => {
                        element.style.outline = null;
                        prevent = false;
                        element.click();
                    });
                }
            }
        });  
    }
});