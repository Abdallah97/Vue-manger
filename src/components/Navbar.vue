<template>
  <nav>
    <!-- sign in dialouge -->
    <v-row justify="center">
       <v-dialog v-model="isShownLogin" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                    v-model="password"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="isShownLogin = false">
              Close
            </v-btn>
            <v-btn  color="blue darken-1" text @click="login">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row justify="center">
      <v-dialog v-model="isShown" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Signup</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                    v-model="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="isShown = false">
              Close
            </v-btn>
            <v-btn  color="blue darken-1" text @click="signUp">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-row>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" top>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Project</span>
        <span>Manger</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey" dark v-bind="attrs" v-on="on" text>
            <v-icon left>mdi-menu-down</v-icon>
            Menu
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            router
            :to="item.route"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="!email"
        text
        color="grey darken-2"
        @click="isShown = !isShown"
      >
        <span>Sign Up</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
        <v-btn
        text
        color="grey darken-2"
        @click="isShownLogin = !isShownLogin" v-if="!email"
      >
        <span>Login</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
      <v-btn @click='signout' text color="grey darken-2">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" bottom color="primary" dark app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-1.png" />
          </v-avatar>
          <p class="white--text subheading mt-1">{{ email }}</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <popup :email=email @show-snackbar="snackbar = true"></popup>
        </v-flex>
      </v-layout>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="warning">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            router
            :to="item.route"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "../components/Popup";
import { fb } from "../fb.js";

export default {
  components: {
    Popup,
  },
  data() {
    return {
      drawer: false,
      selectedItem: 0,
      items: [
        { text: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
        { text: "Projects", icon: "mdi-folder", route: "/projects" },
        {
          text: "Teams",
          icon: "mdi-account-box-multiple-outline",
          route: "/teams",
        },
      ],
      snackbar: false,
      text: "You have added a project Successfully.",
      timeout: 4000,
      isShown: false,
      email: "",
      password: "",
      mode: null,
      isShownLogin:false
    };
  },
  methods: {
    signUp() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log("the user is: ", user);
          this.mode = "signup";
          this.isShown = false;
          this.email = '';
          this.password = '';
          this.$router.replace("/projects");
          
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.mode= 'login';
          this.isShownLogin = false;
          this.email = '';
          this.password = '';
          this.$router.replace("/projects");
         
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
   signout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.mode='';
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
       },
       
    
  },
  created () {
    let user = fb.auth().currentUser;
     this.email = user.email;
  },
};
</script>
<style></style>
