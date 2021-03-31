const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');

require('dotenv').config();

let URL;

if (process.env.NODE_ENV === 'production') {

  URL = 'https://camerashop.vercel.app/';

  } else {

  URL = 'http://localhost:8000/';

  }




module.exports = {
  siteMetadata: {
    title: `CameraShop`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Sandro Fillinich`,
    siteUrl: URL,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [postcssSimpleVars, postcssNested, autoprefixer]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
       spaceId: process.env.CONTENTFUL_ID,
       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
       forceFullSync: true,
       },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.31",
        publicApiKey: process.env.SNIPCART_PUBLIC_KEY, // use public api key here or in environment variable
        currency: "gbp",
        openCartOnAdd: false,
        useSideCart: true,// be careful with this mode cart. The cart in this mode has a bug of scroll in firefox
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -60
      }
    },
    {
      resolve:`gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.2, // Percentage of an element's area that needs to be visible to launch animation
        once: true, // Defines if animation needs to be launched once
        disable: false, // Flag for disabling animations
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
