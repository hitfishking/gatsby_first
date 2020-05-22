// 直接拷贝本地nodejs版代码到云函数中来，没有考虑异步情况，多次反复请求时存在问题。
// 第1次运行该云函数正确，第2次运行时退出，并提示错误：Cannot overwrite `penjing` model once compiled.
//-------对fetch-pengjing1.js的改造：
// 用createConnection()建立conn变量，在conn上建立Model；每次加入对conn是否为空的判断。
// 经此改造,实现了重复请求不出错！而并没有使用任何异步控制！?
// 保留buffer不出错，去掉buffer却出错；云函数场景下，应该去掉buffer。
// 根据调试分析，报错时find().exec(cb)的回调没有运行到！说明异步回调有问题，须要进行同步控制。
var mongoose = require('mongoose');

let conn = null;
const uri = 'mongodb+srv://hitfishking:Yasun1234@cluster0-efppg.azure.mongodb.net/MagazinesDB?retryWrites=true&w=majority'

const conn_params = {
	useNewUrlParser: true,
	dbName: 'MagazinesDB',
	bufferCommands: false,  //保留buffer不出错，去掉buffer却出错；云函数场景下，应该去掉buffer。
	bufferMaxEntries: 0
}


exports.handler = function(event, context, callback) {

	if (conn == null) { 
		conn = mongoose.createConnection(uri, conn_params)
		console.log("----Now, the conn == null -----")  //经确认，conn确实被复用了，并没有设置context.callbackWaitsForEmptyEventLoop = false;

		conn.on('error', err => {
			logError(err);
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

	console.log("==============aaaa==============")
	const M = conn.model('penjing');

	param = "罗汉松";
	pattern = new RegExp(param);

	M.
		find().
		where('dir.article_name', pattern).
		// select('dir.article_name').
		exec((err, docs) => {
			if (err) return handleError(err);
			console.log(docs.length)

			console.log("~~~~~~~~~~~~~~~YYYYYYYYYY~~~~~~~~~~~~~~~~") //报错时该回调没有运行到！说明异步回调有问题，须要进行同步控制。
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

		// ----Now, the conn == null -----
		// ==============aaaa==============
		// ======xxxxxxxxxxxxxxxxx====
		// 该步运行，说明handler()云函数已经运行完毕，但由于没有调用callback()，可能Lambda并没有退出；
		// exec(cb)中的异步cb回调没有被执行，这是问题的关键。
	console.log("======xxxxxxxxxxxxxxxxx====")	
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