const env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `./.env.${env}`});

module.exports = {
  siteMetadata: {
    title: `Dev Life @davematiasei`,
    description: `All about davematiasei's dev career`,
    author: `@davematiasei`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `davematiasei.xyz`,
        short_name: `davematiasei.xyz`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
          bucketName: 'portfolio-frontend-davematias',
          region: 'eu-west-1'
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
