// const sendQuery = require("./helpers/send-query");
import sendQuery from "./helpers/send-query"   //!!! 注意，要用import，不要用require,否则调用sendQuery()时会出奇怪错误!

const CREATE_NOTE = `
  mutation($text: String!){
    createNote(data: {text: $text}){
      _id
      text
    }
  }
`;


exports.handler = async (event, context, callback) => {
	const { text } = JSON.parse(event.body);
	console.log("text==", text);
  // const { data, errors } = await sendQuery(CREATE_NOTE, { text });  //graphql语句，create的同时带查询.
	// const { data, errors } = await sendQuery(CREATE_NOTE, '"variables": {"text": "dongzheng"}');
	// const { data, errors } = await sendQuery(`"query":"${CREATE_NOTE}"`, '"variables": {"text": "dongzheng"}' );
	// const { data, errors } = await sendQuery(CREATE_NOTE, 'variables: {text: "dongzheng"}' );
	// const { data, errors } = await sendQuery(CREATE_NOTE, { text });
	const { data, errors } = await sendQuery(CREATE_NOTE, { text });

	if (errors) {
		callback(errors, {
			statusCode:500,
			body:JSON.stringify(errors) 
		});
	}
	else {
		callback(null, {
			statusCode:200,
			body: JSON.stringify({ newNote: data.createNote })
		});
	}
};
