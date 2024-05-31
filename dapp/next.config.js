const webpack = require('webpack');
const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
    webpack(config) {
        config.resolve.modules.push(path.resolve('./'));
        return config;
    },
    images: {
        domains: ['ipfs.io'], // Add 'ipfs.io' to the list of domains
    },
});
