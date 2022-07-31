<template>
  <v-app>
    <v-main>
      <TwitterUserProfileVue />
    </v-main>
  </v-app>
</template>

<script>

import TwitterUserProfileVue from './components/TwitterUserProfile.vue'

export default {
  name: 'App',

  components: {
    TwitterUserProfileVue
  },

  data: () => ({
    //
  }),
}
</script>
