//使用Co(),yield异步方案；复用conn对象。
//https://www.edwardbeazer.com/get-data-from-mongodb-with-netlify-functions-lambda/
var co = require('co');
var mongoose = require('mongoose');

let conn = null;
const uri = 'mongodb+srv://hitfishking:Yasun1234@cluster0-efppg.azure.mongodb.net/MagazinesDB?retryWrites=true&w=majority'

exports.handler = function(event, context, callback) {

  context.callbackWaitsForEmptyEventLoop = false;

  run().
    then(res => {
      callback(null, res);  //云函数正确情况下，callback()第1参数设置为null.
    }).
    catch(error => callback(error));
};


function run() { 
	//co()应该返回一个promise对象.
  return co(function*() {

    if (conn == null) { 
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
				bufferMaxEntries: 0,
				useNewUrlParser: true,
				dbName: 'MagazinesDB'
			});
			
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
		
		param = "^罗汉松";
		pattern = new RegExp(param);

		//通过 yield可以直接运行Query对象!?
		const docs = yield M.find().
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
		})
		
    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
		};
		
		return response;
  });
}

