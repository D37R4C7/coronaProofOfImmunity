<template>
  <v-container v-show="!isLoggedIn">
    <v-img
      :src="require('@/assets/logo.png')"
      class="logo mb-5"
      height="150px"
      contain
    ></v-img>

    <v-form>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Bitte anmelden...</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <div class="my-5" style="font-weight: bold; text-align: center;">
            Demo Zugangsdaten: 12345 / demo
          </div>

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
            label="Passwort"
            id="password"
            type="password"
            v-model="password"
            @keyup.enter="login()"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="pink" @click="login()">Anmelden</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
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
    if (this.username == "12345" || this.password == "demo") {
      store.dispatch("patient/loggedIn", true);
    }
  }
}
</script>
