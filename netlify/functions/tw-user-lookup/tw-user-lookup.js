// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const needle = require('needle');
const token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/users/by?usernames="

async function getRequest(username) {

  const params = {
      usernames: username, // Edit usernames to look up
      "user.fields": "created_at,description"
  }

  const res = await needle('get', endpointURL, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      "authorization": `Bearer ${token}`
    }
  })

  return res;
}

const handler = async (event) => {
  try {
    const username = event.queryStringParameters.username || "aglamadrid19"
    const response = await getRequest(username);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
    }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
