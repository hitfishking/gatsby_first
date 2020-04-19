import axios from "axios"
// import config from "../config"   //使用netlify dev，可以实现让本地云函数能获得云端设置的环境变量；故不再需要此方案。

exports.handler = function(event, context, callback) {
	const apiRoot = "https://api.unsplash.com"
	const accessKey = process.env.UNSPLASH_ACCESS_KEY   //在Netlify云端运行时，使用UI中设置的环境变量。
	// const accessKey = config.accessKey  //在本地运行时，使用config.js中的key配置。

  const doggoEndpoint = `${apiRoot}/photos/random?client_id=${accessKey}&count=${10}&collections='3816141,1154337,1254279'`

  axios.get(doggoEndpoint).then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        images: res.data,
      }),
    })
  })
}
