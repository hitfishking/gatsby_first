//from https://www.raymondcamden.com/2019/01/08/adding-serverless-functions-to-your-netlify-static-site
exports.handler = function(event, context, callback) {
	
	let data = {
		name:'ray',
		foo:[1,2,4,6,7,886],
		time:Date.now()
	};
	
	console.log('data is '+JSON.stringify(data));

	callback(null, {
		statusCode:200,
		body:JSON.stringify(data)
	});

}
