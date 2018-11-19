const path = require('path')
module.exports = {
    entry: './components/index.js',
    output: {
        path: path.resolve(__dirname + '/dist/assets'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /(node_modules)/,
                // loader: ['babel-loader'],
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-0', 'react', 'react-dom']
                }
            }
        ]
    }
}