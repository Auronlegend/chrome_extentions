const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            // ------------------------------------------------------------------------
            // We need to exclude the content.js script from being injected by webpack.
            // Chrome takes care of loading the script and running it on its own.
            const pluginInstance = webpackConfig.plugins.find(
                webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
            );

            if (pluginInstance) {
                pluginInstance.userOptions.excludeChunks = ['content'];
            }
            // ------------------------------------------------------------------------

            return {
                ...webpackConfig,
                entry: {
                    main: [env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
                    content: ['./src/chrome-services/VowelsReplacerHook.ts'],
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name].js',
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                }
            }
        },
    }
 }