const { ipcRenderer } = require('electron')

console.log('webview preload loaded');
ipcRenderer.on('ping', () => {
    console.log('ping');
    console.log('sending pong...');
    ipcRenderer.sendToHost('pong');
})

//naive method
var cssPath = function (el) {
    if (!(el instanceof Element)) return;
    var path = [];
    while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += '#' + el.id;
        } else {
            var sib = el, nth = 1;
            while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
            selector += ":nth-child(" + nth + ")";
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(" > ");
}

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    ipcRenderer.sendToHost(cssPath(target).toString());
}, false);