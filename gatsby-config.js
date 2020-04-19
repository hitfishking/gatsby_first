// let { createProxyMiddleware } = require("http-proxy-middleware") //netlify dev自带proxy功能，不必单独安装proxy express中间件了。

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@hitfishking`,
  },

  // Enables the use of function URLs locally
  // developMiddleware()是一个函数，可能是由gatsby框架调用，同时，gatsby框架建立一个express对象app，作为参数传入。
  // developMiddleware: app => {
  //   app.use(
  //     "/.netlify/functions/",
  //     createProxyMiddleware({
  //       target: "http://localhost:9000",
  //       pathRewrite: { "/.netlify/functions/": "" },
  //     })
  //   )
  // },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },


  	{
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `cms`,
        url: `https://api-apeast.graphcms.com/v1/ck8f7dkvy0ssk01dmfammgta9/master`,
        typeName: `GraphCMS`,
      },
    },


/*
	{
      resolve: `gatsby-source-graphql`,
      options: {
      typeName: "DRUPAL",  
        fieldName: `acquiaDrupal`,
        url: `http://suxiang.dd:8083/en/graphql`,
      fieldName: `zhuqingDrupal`,
      url: `http://localhost/en/graphql`,
     },
   },
*/

/*	
	{
	  resolve: `gatsby-source-drupal`,
	  options: {
		//baseUrl: `http://suxiang.dd:8083/`,   //suxiang版本出现500错误；应该不是JSON:API版本问题(换版本错误仍在)。
		baseUrl: `http://localhost/zhuqing/`,
		apiBase: `jsonapi`,    
	  },
	},
*/

	
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
