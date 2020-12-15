<template>
  <div class="projects">
    <h1 class="subheading grey--text ma-4">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="(project, i) in myProjects" :key="i">
          <v-expansion-panel-header class="grey--text font-weight-bold ">
            {{ project.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="font-weight-bold">Due by {{ project.due }}</div>
            <div>{{ project.content }}</div>
            <v-btn
              tile
              class="mr-2"
              @click="editDialog(project)"
              color="success"
              small
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn  @click="deleteProject(project)" color="error" small tile>
              X Delete
            </v-btn>
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title class="headline">
                  Edit project
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" class="px-3">
                    <v-text-field
                      v-model="title"
                      label="Title"
                      prepend-icon="mdi-folder"
                      :rules="inputRules"
                    ></v-text-field>
                    <v-textarea
                      v-model="content"
                      label="Information"
                      prepend-icon="mdi-circle-edit-outline"
                      :rules="inputRules"
                    ></v-textarea>
                    <v-spacer></v-spacer>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="due"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="due"
                          label="Due-date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="inputRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="due" title="Due-date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(due)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-btn text class="warning mx-0 mt-3" @click="updateProject(project.id)" :loading="loading"
                      >Update Project</v-btn
                    >
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-spacer></v-spacer>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import { db } from "../fb.js";
export default {
  name: "Teams",
  data() {
    return {
      projects: [],
      dialog: false,
      menu: false,
      loading:false,
       inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
      title:'',
      content:'',
      due:null
    };
  },
  firestore() {
    return {
      projects: db.collection("projects"),
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(
        (project) => project.person === "Abdallah salah"
      );
    },
  },
  methods: {
    deleteProject(doc) {
      this.$firestore.projects.doc(doc.id).delete();
    },
    editDialog(project){
      console.log(project);
      this.title = project.title;
      this.content =  project.content;
      this.due = project.due;
    
      this.dialog = true;
    },
    updateProject(projectId){
      this.loading = true;
      this.$firestore.projects.doc(projectId).update({
        title:this.title,
        content:this.content,
        due:this.due,
      });
      this.loading = false;
      this.title = '';
      this.content = '';
      this.due = ''
      this.dialog = false;

    }
  },
};
</script>
