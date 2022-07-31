<template>
  <div id="app">
    <img :class="gender" :src="picture" :alt="`${firstName} ${lastName}`">
    <h1>{{firstName}} {{lastName}}</h1>
    <h3>Email: {{email}}</h3>
    <v-btn v-on:click="twitterFetch()" :class="gender">Get Random User</v-btn>
  </div>
</template>

<script>

export default {
  name: 'TwitterUserProfile',
  // props: {
  //   msg: String
  // },
  data() {
    return {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        gender: 'male',
        picture: 'https://randomuser.me/api/portraits/men/10.jpg'
    }
  },
  methods: {
    async getUser() {
      // const twUserRes = "https://miau.com"
      const res = await fetch('https://randomuser.me/api')
      const {results} = await res.json()

      console.log(results)
      this.firstName = results[0].name.first,
      this.lastName = results[0].name.last,
      this.email = results[0].email,
      this.gender = results[0].gender,
      this.picture = results[0].picture.large
    },
    
    async twitterFetch() {
      const token = process.env.BEARER_TOKEN;

      const endpointURL = "https://api.twitter.com/2/users/by?usernames="

      async function getRequest() {

        // These are the parameters for the API request
        // specify User names to fetch, and any additional fields that are required
        // by default, only the User ID, name and user name are returned
        const params = {
            usernames: "TwitterDev,TwitterAPI", // Edit usernames to look up
            "user.fields": "created_at,description", // Edit optional query parameters here
            "expansions": "pinned_tweet_id"
        }

        // this is the HTTP header that adds bearer token authentication
        // const res = await needle('get', endpointURL, params, {
        //     headers: {
        //         "User-Agent": "v2UserLookupJS",
        //         "authorization": `Bearer ${token}`
        //     }
        // })
        const response = await fetch(`${endpointURL}${params.usernames}`, {
          headers: new Headers({
            'Authorization': token
          })
        });

        console.log(response)
        // if (res.body) {
        //     return res.body;
        // } else {
        //     throw new Error('Unsuccessful request')
        // }
      }

      try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

      } catch (e) {
          console.log(e);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  width: 400px;
  height: 100vh;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1,
h3 {
  margin-bottom: 1rem;
  font-weight: normal;
}

img {
  border-radius: 50%;
  border: 5px #333 solid;
  margin-bottom: 1rem;
}

.male {
  border-color: steelblue;
  background-color: steelblue;
}

.female {
  border-color: pink;
  background-color: pink;
  color: #333;
}
</style>
