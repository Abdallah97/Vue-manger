<template>
  <div class="teams">
    <h1 class="subheading grey--text ma-4">Teams</h1>
    <v-container fluid class="my-5">
     <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="person in team" :key="person.name"
      >
        <v-card flat color="grey lighten-5" class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span class="">Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
     
    </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  name: 'Teams',
   data() {
    return {
      team: [
        { name: 'Abdallah salah', role: 'Web developer',avatar:'avatar-1.png' },
        { name: 'Ryu', role: 'Graphic designer',avatar:'avatar-2.png' },
        { name: 'Chun Li', role: 'Web developer',avatar:'avatar-3.png' },
        { name: 'Gouken', role: 'Social media maverick',avatar:'avatar-4.png' },
        { name: 'Yoshi', role: 'Sales guru',avatar:'avatar-5.png'}
      ]
    }
  }
}
</script>
