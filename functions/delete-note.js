import sendQuery from "./helpers/send-query" 

const DELETE_NOTE = `
  mutation($id: ID!) {
    deleteNote(id: $id){
      _id
    }
  }
`;

exports.handler = async (event, context, callback) => {
  const { id } = JSON.parse(event.body);
	const { data, errors } = await sendQuery(DELETE_NOTE, { id });
	
	if (errors) {
		callback(errors, {
			statusCode:500,
			body:JSON.stringify(errors) 
		});
	}
	else {
		callback(null, {
			statusCode:200,
			body: JSON.stringify({ deletedNote: data.deleteNote })
		});
	}

}