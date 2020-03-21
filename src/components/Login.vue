<template>
  <v-layout align-center justify-center v-show="!isLoggedIn">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Bitte anmelden...</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="username"
              label="Ihre Arzt Zulassungsnummer"
              id="login"
              type="text"
              v-model="username"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="pink" @click="login()">Anmelden</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { store } from "../store";

@Component({})
export default class HelloWorld extends Vue {
  username = "";
  password = "";

  @Getter("patient/isLoggedIn") public isLoggedIn: boolean | undefined;

  login() {
    if (this.username == "12345" || this.password == "geheim") {
      store.dispatch("patient/loggedIn", true);
    }
  }
}
</script>
