const { environment } = require('@rails/webpacker');
const webpack = require('webpack'); // Ensure this is at the top

const path = require('path');

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
    }
  }
};

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  Rails: '@rails/ujs'
}));

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}));

environment.config.merge({
  entry: {
    application: './app/javascript/packs/application.js',
    home: './app/javascript/packs/home.js'
  }
});

// Add this to choose which .env variables to expose to the frontend
environment.plugins.prepend(
  "Environment",
  new webpack.EnvironmentPlugin(
    JSON.parse(
      JSON.stringify({
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        URL: process.env.URL
      })
    )
  )
);

environment.config.merge(customConfig);

environment.splitChunks();

module.exports = environment;