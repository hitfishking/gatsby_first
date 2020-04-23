import sendQuery from "./helpers/send-query"

const GET_ALL_NOTES = `
  query {
    allNotes {
      data {
        _id
        text
      }
    }
  }
`;

exports.handler = async function(event, context, callback) {
  const { data, errors } = await sendQuery(GET_ALL_NOTES);
  if (errors) {
		callback(errors, {
			statusCode:500,
			body:JSON.stringify(errors)  //从云函数到客户端浏览器，通过http协议，消息body的json要序列化才能发送。
		});
	}
	else {
		callback(null, {
			statusCode:200,
			body:JSON.stringify({ notes: data.allNotes.data })
		});
	}
};