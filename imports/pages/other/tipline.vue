<template>
  <section>
    <v-subheader>Tip Line</v-subheader>
      <v-flex xs12>
        <v-textarea
          solo
          focus
          value=""
        ></v-textarea>
      </v-flex>
    <v-flex xs12 sm6 d-flex>
        <v-select
          :items="['Bullying','Drugs','Feedback','Fighting','Kudos','Personal Crisis','Safety Risk','Threat','Vandalism','Weapons']"
          label="Category"
        ></v-select>
      </v-flex>
    <v-flex xs12 sm6 d-flex>
        <v-select
          :items="['District','Walden','Wilmot','Kipling','South Park','Shepard','Caruso']"
          label="School"
        ></v-select>
      </v-flex>
    <v-flex xs12 sm4 md4>
    <v-checkbox
      v-model="checkbox"
      label="Include location?"
    ></v-checkbox>
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
    data () {
      return {
        checkbox: true,
      }
    },
  methods: {
    updateView
  },
  async created() {
      alert("If this is an emergency, call 911.");
  }
};
</script>
