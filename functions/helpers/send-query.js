import axios from "axios"

const sendQuery = async (query, variables) => {
  // console.log('query=',query)
  // console.log('variables=',variables)

  const result = await axios({
    url: "https://graphql.fauna.com/graphql",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`
    },
    data: { 
      query,
      variables
    }
  });

  return result.data;  //axios的返回值是json格式.
};

export default sendQuery
