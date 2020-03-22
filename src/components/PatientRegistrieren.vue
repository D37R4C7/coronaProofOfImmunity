<template>
  <v-container class="grey lighten-5" v-show="isLoggedIn">
    <v-form>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Patientendaten</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" sm="6">
              <v-combobox
                v-model="krankenkasse"
                :items="krankenkassen"
                label="Krankenkasse"
                :rules="required"
                hide-details="auto"
              ></v-combobox>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-show="
                  krankenkasse.text !== undefined &&
                    krankenkasse.text !== 'Privatpatient'
                "
                v-model="versichertennummer"
                label="Versichertennummer"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-show="krankenkasse.text !== undefined">
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="vorname"
                label="Vorname"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="nachname"
                label="Nachname"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row
            v-show="
              krankenkasse.text !== undefined &&
                krankenkasse.text === 'Privatpatient'
            "
          >
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="strasse"
                label="Straße"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="plz"
                label="PLZ"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="ort"
                label="Ort"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" xs="12" sm="6">
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
                    v-show="krankenkasse.text !== undefined"
                    :value="formatDate(birthdate)"
                    label="Geburtsdatum"
                    append-icon="event"
                    :rules="required"
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
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(birthdate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <br />

      <v-card>
        <v-toolbar dark color="secondary">
          <v-toolbar-title>Angaben zum Test</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" sm="6">
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
                    :rules="required"
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
            </v-col>
            <v-col cols="12" sm="6">
              <v-combobox
                v-model="test"
                :items="tests"
                :rules="required"
                label="Durchgeführter Test"
              ></v-combobox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" xs="12" sm="6">
              <v-text-field
                v-model="decodedCode"
                label="Seriennummer des Tests"
                :rules="required"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                @click="
                  () => {
                    scanCode = true;
                    decodedCode = '';
                  }
                "
                >QR Code auf dem Test scannen</v-btn
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="6">
              <qrcode-stream
                v-if="scanCode"
                @decode="onDecode"
                style="border: #888888 1px solid; box-shadow: 5px 5px 5px 0px rgba(136,136,136,1);"
              ></qrcode-stream>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <br />

      <v-card>
        <v-toolbar dark color="teal">
          <v-toolbar-title>Andere Projekte unterstützen</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              Der Patient möchte seinen Immunstatus folgenden Projekten zur
              Verfügung stellen:
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-switch v-model="immun" label="IMMUNEHEROES"></v-switch>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <br />

      <v-row>
        <v-col cols="12">
          <v-btn dark color="pink" @click="save()" style="float: right;"
            >Daten übermitteln</v-btn
          >
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline"
              >Vielen Dank für Ihre Mithilfe!</v-card-title
            >
            <v-card-text>Die Daten wurden erfolgreich übertragen.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="pink" @click="dialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-form>
  </v-container>
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

  krankenkasse: any = "";
  versichertennummer = "";
  vorname = "";
  nachname = "";
  strasse = "";
  plz = "";
  ort = "";
  test: any = "";
  immun = false;
  date = null;
  testdate = null;
  birthdate = null;
  menuBirthdate = false;
  menuTestdate = false;

  required = [(value: any) => !!value || "Pflichtfeld"];
  nowDate = new Date().toISOString().slice(0, 10);
  scanCode = false;
  decodedCode = "";

  dialog = false;

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

    this.dialog = true;

    // TODO
    // this.krankenkasse = "";
    // this.versichertennummer = "";
    // this.vorname = "";
    // this.nachname = "";
    // this.strasse = "";
    // this.plz = "";
    // this.ort = "";
    // this.test = "";
    // this.immun = false;
    // this.date = null;
    // this.testdate = null;
    // this.birthdate = null;
    // this.menuBirthdate = false;
    // this.menuTestdate = false;
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
