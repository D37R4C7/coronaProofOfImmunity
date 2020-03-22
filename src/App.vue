<template>
  <v-app>
    <nav>
      <v-app-bar dark class="primary">
        <v-img
          :src="require('@/assets/logo.png')"
          class="logo"
          height="60px"
          max-width="200px"
          contain
        ></v-img>
        <v-toolbar-title class="title">
          ImmunSicht - COVID-19 - Immunitätsdatenbank
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/" exact>Patient melden</v-btn>
          <v-btn text to="/about">Zielsetzung</v-btn>
          <v-btn v-show="isLoggedIn" @click="logout()" dark color="pink"
            >Abmelden</v-btn
          >
        </v-toolbar-items>
      </v-app-bar>

      <v-navigation-drawer dark color="primary" app v-model="drawer" right>
        <v-list dense nav class="py-0">
          <v-list-item two-line class="px-0">
            <v-list-item-content>
              <v-list-item-title class="title">Menü</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Patient melden</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>description</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Zielsetzung</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list-item v-show="isLoggedIn" @click="logout()">
          <v-list-item-icon>
            <v-icon>logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Abmelden</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
    </nav>

    <v-content style="background-image: url('/img/background.jpg')">
      <!-- Display view pages here based on route -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { store } from "@/store";

@Component
export default class App extends Vue {
  @Getter("patient/isLoggedIn") public isLoggedIn: boolean | undefined;

  drawer = false;

  logout() {
    store.dispatch("patient/loggedIn", false);
  }
}
// export default {
//   name: "App",
//   data() {
//     return {
//       drawer: false // Hide mobile side menu by default
//     };
//   }
// };
</script>
