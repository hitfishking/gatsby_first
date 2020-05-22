//netlify dev自带proxy功能，若使用netlify dev, 则不必单独安装proxy express中间件了,可关闭此项。
//netlify dev目前遇到的问题是更新相应速度慢，故目前仍用回gatsby develop + start:lambda.
let { createProxyMiddleware } = require("http-proxy-middleware") 

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@hitfishking`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdowns`,
        path: `${__dirname}/src/markdowns`,
      },
    },
    'gatsby-transformer-remark',

  	{
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `cms`,
        url: `https://api-apeast.graphcms.com/v1/ck8f7dkvy0ssk01dmfammgta9/master`,
        typeName: `GraphCMS`,
      },
    },
	
	
	{
    resolve: `gatsby-source-mongodb`,
    options: { 
      connectionString: `mongodb+srv://hitfishking:Yasun1234@cluster0-efppg.azure.mongodb.net/test?retryWrites=true&w=majority`,
      dbName: `MagazinesDB`, 
      collection: [`penjing`, `books`] 
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

    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://static2.wolfbook.cn/` // required!
      }
    },

	
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


  // Enables the use of function URLs locally
  // developMiddleware()是一个函数，可能是由gatsby框架调用，同时，gatsby框架建立一个express对象app，作为参数传入。
  // 仅在development模式下起作用，故不必在production模式下人为关闭此功能。
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: { "/.netlify/functions/": "" },
      })
    )
  },
}
