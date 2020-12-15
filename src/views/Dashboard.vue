<template>
  <div class="dashboard">
    <h1 class="subheading grey--text ma-4">Dashboard</h1>
    

    <v-container class="my-5">
      <v-row justify-start class="mb-3">
       <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small text color="grey"
          v-bind="attrs"
          v-on="on"
          @click="sortBy('title')"
        >
         <v-icon small left>mdi-folder</v-icon>
          <span class="caption text-lowercase">By project name</span>
        </v-btn>
      </template>
      <span>Sort by Project title</span>
    </v-tooltip>
     <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small text color="grey"
          v-bind="attrs"
          v-on="on"
          @click="sortBy('person')"
        >
         <v-icon small left>mdi-account</v-icon>
          <span class="caption text-lowercase">By Person</span>
        </v-btn>
      </template>
      <span>Sort by Person name</span>
    </v-tooltip>
    </v-row>

      <v-card flat v-for="project in projects" :key="project.title">
      <v-row no-gutters :class="`pa-3 project ${project.status}`">
        <v-col cols="6" sm="6" md="6">
          
            <div class="caption grey--text font-weight-bold">Project title</div>
            <div>{{project.title}}</div>
          
        </v-col>
        <v-col cols="6" md="2">
          
           <div class="caption grey--text font-weight-bold">Person</div>
            <div>{{project.person}}</div>
         
        </v-col>
        <v-col cols="6" sm="6" md="2">
            <div class="caption grey--text font-weight-bold">Due By</div>
            <div>{{project.due}}</div>

        </v-col>
        <v-col cols="6" sm="6" md="2">
           <div class="right">
              <v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip>
            </div>
        </v-col>
  
      </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {db}  from '../fb.js';
export default {
  name: "Dashboard",
  data() {
    return {
      projects: []
    }
  },
   firestore(){
      return {
        projects: db.collection('projects'),
      }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b)=>a[prop] < b[prop] ? -1 : 1);
    }
  },
};
</script>

<style scoped>
.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid #ffaa2c;
}
.project.overdue{
  border-left: 4px solid #f83e70;
}
.v-chip.complete{
  background: #3cd1c2 !important;
}
.v-chip.ongoing{
  background: #ffaa2c !important;
}
.v-chip.overdue{
  background: #f83e70 !important;
}

</style>
