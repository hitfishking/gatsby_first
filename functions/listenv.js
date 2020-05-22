exports.handler = function(event, context, callback) {

	var temp = process.env.docker_host;
	console.log("112244");
	console.log(temp);
	console.log(event.path);  // /listenv
	
	callback(null, {
			statusCode:200,
			body: JSON.stringify({ temp })
	});
}