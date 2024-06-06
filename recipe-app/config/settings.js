module.exports = {
    build: {
        publicPath: '/',
        supportedBrowsers: [
            '>0.5%',
            'not dead',
            'not IE 11',
            'maintained node versions',
            'Firefox ESR',
            'last 2 versions'
        ],
        mainBundleName: 'recipe-app',
        vendorLibs: 'react|react-dom'
    },
    proxy: {
        paths: ['/api'],
        port: 80
    },

    // APP RELATED
    html: {
        theme: '#6118d6',
        title: 'DIS Recipe app'
    },
//    translation: {
//        fileId: '15qtLxs9z9jv9L4fkFyC2fVED7OoymKAueSiLD_dIFO8',
//        cachePath: './languageCache.json'
//    },
}
