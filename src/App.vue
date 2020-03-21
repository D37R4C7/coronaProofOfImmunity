<template>
  <v-app>
    <nav>
      <v-app-bar dark class="primary">
        <v-toolbar-title class="headline">#WirVsVirusHack</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/" exact>Patient melden</v-btn>
          <v-btn text to="/about">Zielsetzung</v-btn>
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
      </v-navigation-drawer>
    </nav>

    <v-content>
      <!-- Display view pages here based on route -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false // Hide mobile side menu by default
    };
  }
};
</script>
