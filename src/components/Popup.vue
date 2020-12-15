<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="email" color="warning" dark v-bind="attrs" v-on="on">
        Add New Project
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Add new project
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
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="date"
                label="Due-date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="inputRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" title="Due-date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn text @click="submit" class="warning mx-0 mt-3" :loading='isLoading'
            >Add Project</v-btn
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
</template>
<script>
// import {format} from "date-fns";
import {db} from '../fb.js';
export default {
  name: "popup",
  props:['email'],
  data() {
    return {
      dialog: false,
      isLoading:false,
      menu: false,
      title: "",
      content: "",
      date: null,
      inputRules: [
        (v) => !!v || "This field is required",
        (v) => v.length >= 3 || "Minimum length is 3 characters",
      ],
    };
  },
 methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.isLoading = true;
        const project = { 
          title: this.title,
          content: this.content,
          due:this.date,
          person: 'Abdallah salah',
          status: 'ongoing'
        }
        db.collection('projects').add(project).then(() => {
          this.isLoading = false;
          this.dialog = false;
          this.title ='' ;
          this.content = '';
          this.data = null;
          this.$emit('show-snackbar');
          
        })
      }
    }
  },
};
</script>
