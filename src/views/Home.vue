<template>
  <v-container>
    <Login class="mt-5" />
    <PatientRegistrieren />
  </v-container>
</template>

<script>
import Login from "../components/Login";
import PatientRegistrieren from "../components/PatientRegistrieren";

export default {
  components: {
    Login,
    PatientRegistrieren
  }
};
</script>
