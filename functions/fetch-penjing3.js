//使用async/await方案做异步控制。
//https://mongoosejs.com/docs/lambda.html
//该方案结果正确，但出现一个warning：TypeError: Cannot read property 'statusCode' of undefined。
//异步async函数返回一个promise，用该promise的then(),catch()的异步回调函数处理数据，可以解决以上问题。
const mongoose = require('mongoose');

let conn = null;
const uri = 'mongodb+srv://hitfishking:Yasun1234@cluster0-efppg.azure.mongodb.net/MagazinesDB?retryWrites=true&w=majority'
let queryItem = "";

exports.handler = function(event, context, callback) {
	queryItem = JSON.parse(event.body).text;
	console.log("queryItem ==", queryItem);

	context.callbackWaitsForEmptyEventLoop = false;

  run().
    then(res => {
      callback(null, res);  //云函数正确情况下，callback()第1参数设置为null.
    }).
    catch(error => callback(error));

};


async function run() {  //异步函数，返回promise.
	if (conn == null) { 
		conn = await mongoose.createConnection(uri, {
			bufferCommands: false,
			bufferMaxEntries: 0,
			useNewUrlParser: true,
			dbName: 'MagazinesDB'
		});		
		// await conn;

		var BookSchema = new mongoose.Schema({
			year: String,
			month: String,
			dir: [{
				article_name: String,
				article_page: String
			}]
		});

		//只在第1次连接时才建立Model.
		conn.model('penjing', BookSchema, 'penjing');
	}

	const M = conn.model('penjing');
		
	// param = "^罗汉松";
	param = queryItem;
	pattern = new RegExp(param);  //用查询关键字构建自动机网络对象pattern.

	const docs = await M.find().
						where('dir.article_name', pattern)

	let result = []  //构造结果数组，每一项是一个json对象。
	docs.map(doc => {
		doc.dir.map(adir => {
			if (pattern.test(adir.article_name)) {
				disp_content = `${doc.year}  ${doc.month}  ${adir.article_name}  ${adir.article_page}`
				console.log(disp_content);

				result.push({
					year: doc.year,
					month: doc.month,
					article_name: adir.article_name,
					article_page: adir.article_page
				})
			}
		})
	});

	// callback(null, {
	// 	statusCode:200,
	// 	body:JSON.stringify(result)
	// });

	const response = {
		statusCode: 200,
		body: JSON.stringify(result)
	};
	
	return response;    //异步函数，返回promise.

}