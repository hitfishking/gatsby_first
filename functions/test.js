exports.handler = function(event, context, callback) {
	//body中是序列化的json，其中包括{"name":"james"}; 该ES6语法可以提取json中的部分字段。
	const { name } = JSON.parse(event.body)   
	if (name == 'james'){
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({msg: `Thanks for visiting ${name}`}),
		})
	} else {
		callback(new Error("You're not James!"))
	}
}
