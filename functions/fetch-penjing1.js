// 直接拷贝本地nodejs版代码到云函数中来，没有考虑异步情况，多次反复请求时存在问题。
// 第1次运行该云函数正确，第2次运行时退出，并提示错误：Cannot overwrite `penjing` model once compiled.
var mongoose = require('mongoose');

const uri = 'mongodb+srv://hitfishking:Yasun1234@cluster0-efppg.azure.mongodb.net/MagazinesDB?retryWrites=true&w=majority'

const conn_params = {
	useNewUrlParser: true,
	dbName: 'MagazinesDB'
}


exports.handler = function(event, context, callback) {

	mongoose.connect(uri, conn_params).
  	catch(err => handleError());

	mongoose.connection.on('error', err => {
		logError(err);
	});

	mongoose.connection.once('open', function() {
		var BookSchema = new mongoose.Schema({
			year: String,
			month: String,
			dir: [{
				article_name: String,
				article_page: String
			}]
		});
	
		var M = mongoose.model('penjing', BookSchema, 'penjing');   
		
		param = "罗汉松";
		pattern = new RegExp(param);
	
		M.
			find().
			where('dir.article_name', pattern).
			// select('dir.article_name').
			exec((err, docs) => {
				if (err) return handleError(err);
				console.log(docs.length)
	
				docs.map(doc => {
					doc.dir.map(adir => {
						if (pattern.test(adir.article_name)) {
							disp_content = `${doc.year}  ${doc.month}  ${adir.article_name}  ${adir.article_page}`
							console.log(disp_content)
						}
					})
				})
				//以下，查询后即使断开连接，并且云函数返回，但再次运行时仍然出现 Cannot overwrite `penjing` model once compiled.错误。未解决。
				mongoose.connection.close();
				callback(null, {
					statusCode:200,
					body:JSON.stringify("Function Returned!")
				});
			})
	});

}




// mongoose.connect(uri, conn_params).
// catch(err => handleError());

// mongoose.connection.on('error', err => {
// 	logError(err);
// });


// mongoose.connect(uri, function(err) {
// 	if(err) throw err;
// 	console.log('Successfully connected');
// })

// const dataSchema = new mongoose.Schema({});
// const dataModel = mongoose.model('modelName', dataSchema, 'books');
// dataModel.find({}, function(err, books) {
// 	if (err) throw err;
// 	console.log(books)
// });