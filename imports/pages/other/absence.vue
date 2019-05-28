<template>
  <section>
    <v-subheader>Report an Absence</v-subheader>
    <v-flex xs12 sm6 md3>
      <v-text-field
        label="Name of Student"
        outline
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 d-flex>
        <v-select
          :items="['Walden','Wilmot','Kipling','South Park','Shepard','Caruso']"
          label="School"
          outline
        ></v-select>
      </v-flex>
    <v-flex xs12 lg6>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          full-width
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              box
              outline
              label="Date of Absence"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    <v-flex xs12 sm6 d-flex>
        <v-textarea
          box
          outline
          label="Reason for Absence"
          value=""
        ></v-textarea>
      </v-flex>
  </section>
</template>

<style scoped lang="sass" src="../../sass/other/general.sass"></style>

<script>
import showdown from "showdown";
import { updateView } from "../../app/methods";
import { Teachers } from "../../app/database";
import moment from 'moment'

export default {
  name: "Report an Absence",
  data() {
    return {
      title: "",
      items: [],
      date: new Date().toISOString().substr(0, 10),
      menu1: false
    };
  },
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      }
    },
  methods: {
    updateView
  },
  async created() {
  }
};
</script>
