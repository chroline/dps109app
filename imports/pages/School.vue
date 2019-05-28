<template>
    <section>
      <v-sheet
        class="header-img"
        elevation="5"
        v-bind:style="'background-image: url(/assets/imgs/schools/' +  website  + '.jpg)'"
      >
        <div class="name">
          <h1>{{ name() }}</h1>
        </div>
      </v-sheet>
      <table class="table my-4">
        <tbody>
          <tr>
            <v-btn v-on:click="updateView('directory',$route.params.name)" depressed large round block color="red darken-4" dark class="mb-2">Directory</v-btn>
          </tr>
          <tr>
            <v-sheet elevation="0" class="mx-auto px-3 pb-2 mb-2" height="100%" width="100%">
              <v-subheader class="my-0">Website</v-subheader>
              <p class="title" style="margin: 0; font-family: Heebo">{{ website }}.dps109.org</p>
            </v-sheet>
          </tr>
          <tr>
            <v-sheet elevation="0" class="mx-auto px-3 pb-2 mb-2" height="100%" width="100%">
              <v-subheader class="my-0">Phone</v-subheader>
              <p class="title" style="margin: 0; font-family: Heebo">{{ phone }}</p>
            </v-sheet>
          </tr>
          <tr>
            <v-sheet elevation="0" class="mx-auto px-3 pb-2 mb-2" height="100%" width="100%">
              <v-subheader class="my-0">Address</v-subheader>
              <p class="title" style="margin: 0; font-family: Heebo" v-html="address"></p>
            </v-sheet>
          </tr>
        </tbody>
      </table>
    </section>
</template>
<style scoped lang="sass" src="../sass/school.sass"></style>
<script>
import { updateView } from "../app/methods";
import showdown from "showdown";

export default {
  name: "Teacher",
  data() {
    return {
      name: () => {},
      phone: "1234",
      website: "dps109.org",
      address: ""
    };
  },
  methods: {
    updateView
  },
  async mounted() {
    var desc = async function() {
      return new Promise(async resolve => {
        let send;
        await Meteor.call(
          "fileRetrieve",
          this.$route.params["Bio"][0].url,
          function(e, r) {
            resolve(new showdown.Converter().makeHtml(r));
          }
        );
      });
    }.bind(this);
    this.name = function() {
      switch (this.$route.params.name) {
				case "Shepard":
				case "Caruso":
					return this.$route.params.name + " Middle School";
					break;
				default:
					return this.$route.params.name + " Elementary School";
					break;
			}
    }.bind(this);
    this.phone = this.$route.params.phone;
    this.website = this.$route.params.name
      .replace(" ", "")
      .toLowerCase();
    this.address = this.$route.params.address.replace("\n", "<br >");
  }
};
</script>
