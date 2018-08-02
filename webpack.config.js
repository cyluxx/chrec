//This config is only for bundling content scripts.
const path = require('path');

module.exports = {
    entry: './content-scripts/src/index.js',
    output: {
        path: path.resolve(__dirname, 'content-scripts'),
        filename: 'content-scripts.js'
    },
    mode: 'production'
}