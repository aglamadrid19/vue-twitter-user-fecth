<template>
  <v-app>
    <v-main>
      <HelloWorld/>
      <TwitterUserProfileVue />
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TwitterUserProfileVue from './components/TwitterUserProfile.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    TwitterUserProfileVue
  },

  data: () => ({
    //
  }),
}
</script>
