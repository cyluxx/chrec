module.exports = {
    module: {
        rules: [
            {
                test: /\.node?$/,
                use: 'electron-node-loader'
            }
        ]
    }
};