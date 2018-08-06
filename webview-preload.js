const { ipcRenderer } = require('electron');
const CssSelectorGenerator = require('css-selector-generator').CssSelectorGenerator;

global.myapi = {
    CssSelectorGenerator: CssSelectorGenerator
}

var cssSelectorGenerator = new myapi.CssSelectorGenerator;

function sendMessage(event) {
    let send = {
        selector: cssSelectorGenerator.getSelector(event.target),
        value: event.target.value,
        type: event.type,
        keyCode: event.keyCode,
    }
    ipcRenderer.sendToHost(JSON.stringify(send));
}

// wait for document ready
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
        element.addEventListener('focusout', function (event) {
            sendMessage(event);
        });
    }

    for (let element of clickableElements) {
        element.addEventListener('click', function (event) {
            sendMessage(event);
        });
    }
});