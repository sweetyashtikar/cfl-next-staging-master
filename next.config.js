/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // experimental: {
  //   nextScriptWorkers: true,
  // },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'cfl-next-production.s3.amazonaws.com',
      'cfl-next-develop.s3.amazonaws.com',
      'cofounderslab-testing.s3.amazonaws.com',
      's3.amazonaws.com',
      'images.unsplash.com',
      'process.fs.teachablecdn.com',
      'gravatar.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard/messages',
        destination: '/messages',
        permanent: true,
      },
      {
        source: '/device-redirect/view-conversation',
        destination: '/messages',
        permanent: true,
      },
      {
        source: '/premium-membership',
        destination: '/premium',
        permanent: true,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
// process.env.NODE_ENV === 'development'
// ? moduleExports
// : withSentryConfig(moduleExports, sentryWebpackPluginOptions);
