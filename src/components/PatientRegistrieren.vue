<template>
  <v-layout align-center justify-center v-show="isLoggedIn">
    <v-flex xs12 md8>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Patientendaten</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-combobox
              v-model="krankenkasse"
              :items="krankenkassen"
              label="Krankenkasse"
              :rules="rules"
              hide-details="auto"
            ></v-combobox>
            <v-text-field
              v-show="krankenkasse !== '' && krankenkasse !== 'Privatpatient'"
              v-model="versichertennummer"
              label="Versichertennummer"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-show="krankenkasse !== ''"
              v-model="vorname"
              label="Vorname"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-show="krankenkasse !== ''"
              v-model="nachname"
              label="Nachname"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-show="krankenkasse !== '' && krankenkasse === 'Privatpatient'"
              v-model="strasse"
              label="Straße"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-show="krankenkasse !== '' && krankenkasse === 'Privatpatient'"
              v-model="plz"
              label="PLZ"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-show="krankenkasse !== '' && krankenkasse === 'Privatpatient'"
              v-model="ort"
              label="Ort"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>

            <v-menu
              ref="menuBirthdate"
              v-model="menuBirthdate"
              :close-on-content-click="true"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-show="krankenkasse !== ''"
                  :value="formatDate(birthdate)"
                  label="Geburtsdatum"
                  append-icon="event"
                  :rules="rules"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birthdate"
                no-title
                scrollable
                :max="nowDate"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuBirthdate = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu.save(birthdate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>

        <v-toolbar dark color="secondary">
          <v-toolbar-title>Angaben zum Test</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-menu
              ref="menuTestdate"
              v-model="menuTestdate"
              :close-on-content-click="true"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatDate(testdate)"
                  label="Test durchgeführt am"
                  append-icon="event"
                  :rules="rules"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="testdate"
                no-title
                scrollable
                :max="nowDate"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuTestdate = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu.save(testdate)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>

            <v-combobox
              v-model="test"
              :items="tests"
              :rules="rules"
              label="Durchgeführter Test"
            ></v-combobox>

            <v-switch
              v-model="immun"
              label="COVID 19 Immunität wurde festgestellt"
            ></v-switch>

            <v-row class="mb-6" no-gutters>
              <v-col xs="12" md="6">
                <v-text-field
                  v-model="decodedCode"
                  label="Seriennummer des Tests"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col xs="12" md="6">
                <v-btn
                  color="primary"
                  @click="
                    () => {
                      scanCode = true;
                      decodedCode = '';
                    }
                  "
                  >Seriennummer scannen</v-btn
                >
              </v-col>
            </v-row>

            <qrcode-stream
              v-if="scanCode"
              @decode="onDecode"
              class="mt-3"
            ></qrcode-stream>
          </v-form>
        </v-card-text>

        <v-toolbar dark color="teal">
          <v-toolbar-title>Andere Projekte unterstützen</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          Der Patient möchte seinen Immunstatus folgenden Projekten zur
          Verfügung stellen:

          <v-form>
            <v-switch v-model="immun" label="IMMUNEHEROES"></v-switch>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="pink" @click="save()">Daten übermitteln</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { store } from "@/store";
import moment from "moment";
import { QrcodeStream } from "vue-qrcode-reader";

@Component({
  components: {
    QrcodeStream
  }
})
export default class Patientregistrieren extends Vue {
  @Getter("patient/isLoggedIn") public isLoggedIn: boolean | undefined;
  @Getter("patient/krankenkassen") public krankenkassen: boolean | undefined;
  @Getter("patient/tests") public tests: boolean | undefined;

  krankenkasse = "";
  versichertennummer = "";
  vorname = "";
  nachname = "";
  strasse = "";
  plz = "";
  ort = "";
  test = "";
  immun = false;
  date = null;
  testdate = null;
  birthdate = null;
  menuBirthdate = false;
  menuTestdate = false;

  rules = [(value: any) => !!value || "Pflichtfeld"];
  nowDate = new Date().toISOString().slice(0, 10);
  scanCode = false;
  decodedCode = "";

  save() {
    store.dispatch("patient/save", {
      // eslint-disable-next-line @typescript-eslint/camelcase
      insurance_company: this.krankenkasse.value,
      // eslint-disable-next-line @typescript-eslint/camelcase
      citizen_id: this.versichertennummer,
      // eslint-disable-next-line @typescript-eslint/camelcase
      first_name: this.vorname,
      // eslint-disable-next-line @typescript-eslint/camelcase
      last_name: this.nachname,
      street: this.strasse,
      postcode: this.plz,
      city: this.ort,
      birthday: this.birthdate,
      // eslint-disable-next-line @typescript-eslint/camelcase
      test_method: this.test.value,
      // eslint-disable-next-line @typescript-eslint/camelcase
      date_of_test: this.testdate,
      // eslint-disable-next-line @typescript-eslint/camelcase
      result_positve: this.immun,
      // eslint-disable-next-line @typescript-eslint/camelcase
      case_code: this.decodedCode
    });
  }

  public onDecode(code: any): any {
    this.scanCode = false;
    this.decodedCode = code;
  }

  formatDate(timestamp: any): string {
    return timestamp ? moment(timestamp).format("DD.MM.YYYY") : "";
  }

  created() {
    store.dispatch("patient/load", {});
  }
}
</script>
