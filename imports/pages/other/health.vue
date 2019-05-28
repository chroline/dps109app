<template>
  <section>
    <v-subheader>Health Information</v-subheader>
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
