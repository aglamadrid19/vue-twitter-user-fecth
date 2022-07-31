// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const needle = require('needle');
const token = process.env.BEARER_TOKEN;
const endpointProfileImage = "https://api.twitter.com/2/users/by/username/"

async function getRequest(username) {
  const endpointURL = `${endpointProfileImage}${username}?user.fields=profile_image_url`

  const res = await needle('get', endpointURL, {
    headers: {
        "User-Agent": "v2UserLookupJS",
        "authorization": `Bearer ${token}`
    }
  })

  return res;  
}

const handler = async (event) => {
  try {
    const username = event.queryStringParameters.username
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
