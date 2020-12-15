<template>
  <v-app class="grey lighten">
    <navbar></navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar,
  },
 
  
};
</script>
