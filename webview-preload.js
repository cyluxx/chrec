const { ipcRenderer } = require('electron')

console.log('webview preload loaded');
ipcRenderer.on('ping', () => {
    console.log('ping');
    console.log('sending pong...');
    ipcRenderer.sendToHost('pong');
})