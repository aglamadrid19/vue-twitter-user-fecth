<template>
  <div id="app">
    <v-container
      id="input-usage"
      fluid
    >
      <v-row>
        <v-col cols="9">
          <v-text-field
            v-model="searchValue"
            v-if="!error"
            variant="outlined"
            clearable
            clear-icon="mdi:mdi-cancel"
          ></v-text-field>
          <v-text-field
            v-model="searchValue"
            v-else
            variant="outlined"
            clearable
            error
            hint="No user found"
            clear-icon="mdi:mdi-cancel"
          ></v-text-field>

        </v-col>
        <v-col> 
          <v-btn
            v-if="!waitingOnUser"
            class="profile-border"
            icon="mdi:mdi-account-search"
            v-on:click="twitterUserLookup()"
            @click="waitingOnUser = !waitingOnUser"
          ></v-btn>
      
          <v-btn
            v-else
            class="profile-border"
            elevation="2"
            icon="fas fa-circle-notch fa-spin"
            rounded
            style="cursor: auto;"
          ></v-btn>
         
        </v-col>
      </v-row>
    </v-container>
    <img class="profile-border" :height=125 :width=125 :src="picture" :alt="`${fullName}`">
    <h1>{{fullName}}</h1>
    <h3>Username: {{username}}</h3>
    <h3>Created on: {{creation_date}}</h3>
  </div>
</template>

<script>

export default {
  name: 'TwitterUserProfile',
  data() {
    return {
        error: false,
        waitingOnUser: false,
        fullName: "Alvaro Lamadrid",
        gender: "male",
        picture: "https://pbs.twimg.com/profile_images/1529881217964834819/fevy6a_v.jpg",
        searchValue: "",
        username: "aglamadrid19",
        creation_date: "Sun Apr 10 2022 12:02:27 GMT-0400 (Eastern Daylight Time)"
    }
  },
  methods: {
    async twitterFetch() {
      let result;
      
      await fetch("/.netlify/functions/tw-user-fetch")
        .then(response => response.json())
        .then(data => (result = data.data));

      this.picture = result.profile_image_url.replace("_normal", "")
    },

    async twitterUserLookup() {
      this.error = false 
      let userResult;
      let result;
      
      await fetch(`/.netlify/functions/tw-user-lookup?username=${this.searchValue}`)
        .then(response => response.json())
        .then(data => (userResult = data));

      if(userResult.errors){
        console.log("No username found")
        this.waitingOnUser = !this.waitingOnUser;
        this.error = !this.error;
        return
      }

      this.username = userResult.data[0].username;
      this.creation_date = new Date(userResult.data[0].created_at);

      await fetch(`/.netlify/functions/tw-user-fetch?username=${this.username}`)
        .then(response => response.json())
        .then(data => (result = data.data));

      this.fullName = result.name
      this.picture = result.profile_image_url.replace("_normal", "")

      this.waitingOnUser = !this.waitingOnUser;
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

.profile-border {
  color: white;
  border-color: steelblue;
  background-color: steelblue;
}

.v-btn__overlay {
  opacity: 0 !important;
}
</style>
