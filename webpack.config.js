
const webpack = require('webpack');
const path    = require('path');

module.exports = (env, argv) => {
    let devmode;
    let isDevelopment = argv.mode === 'development';
    if(isDevelopment === true){
        devmode = 'inline-source-map';
        console.log('[OK] debug build');
    }else{
        devmode = 'none';
        console.log('[OK] release build');
    }
    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            script: './script.js'
        },
        output: {
            path: path.resolve(__dirname, 'public/js'),
            publicPath: './',
            filename: 'script.js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            open: true,
            port: 9090,
            publicPath: '/js/',
            watchContentBase: true
        },
        cache: true,
        devtool: devmode
    };
};
