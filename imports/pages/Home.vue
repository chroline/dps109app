<template>
  <section>
    <div class="teachers">
      <div class="heading">
        <p>Your Teachers</p>
      </div>
      <div class="list">
        <span v-show="show == true">
          <div
            class="item"
            v-for="teacher in favorites"
            v-on:click="updateView('teacher', [teacher['id'],teacher['School']])"
            :key="teacher['id']"
            v-bind:style="
								'background-image: url(' + teacher['Media'][0].url + ')'
							"
          >
            <p>
              {{ teacher["Prefix"] }}
              {{ teacher["Last name"] }}
            </p>
          </div>
          <div v-show="favorites.length == 0" class="none">
            <p>You don't have any saved teachers.</p>
          </div>
        </span>
      </div>
    </div>
    <div class="schools">
      <p>All Schools</p>
      <div class="list">
        <div class="item" v-on:click="updateView('school', 'Walden')">
          <p>Walden Elementary School</p>
        </div>
        <div class="item" v-on:click="updateView('school', 'Wilmot')">
          <p>Wilmot Elementary School</p>
        </div>
        <div class="item" v-on:click="updateView('school', 'Kipling')">
          <p>Kipling Elementary School</p>
        </div>
        <div class="item" v-on:click="updateView('school', 'South Park')">
          <p>South Park Elementary School</p>
        </div>
        <div class="break"></div>
        <div class="item" v-on:click="updateView('school', 'Shepard')">
          <p>Shepard Middle School</p>
        </div>
        <div class="item" v-on:click="updateView('school', 'Caruso')">
          <p>Caruso Middle School</p>
        </div>
      </div>
    </div>
    <div class="pages">
      <p>Pages</p>
      <div class="list">
        <div class="item yellow" v-on:click="updateView('Report_an_Absence')">
          <p>Report an Absence</p>
        </div>
        <div class="item green" v-on:click="updateView('Tip_Line')">
          <p>Tip Line</p>
        </div>
        <div class="item red" v-on:click="window.open('https://www.dps109.org/Page/2')">
          <p>Calendar</p>
        </div>
        <div class="item blue" v-on:click="window.open('https://skyward.iscorp.com/scripts/wsisa.dll/WService=wsfindeerfieldil/seplog01.w')">
          <p>Skyward</p>
        </div>
        <div class="item purple" v-on:click="updateView('For_Parents')">
          <p>For Parents</p>
        </div>
        <div class="item red" v-on:click="window.open('https://www.dps109.org/domain/553')">
          <p>Health Information</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { updateView } from "../app/methods";
import { Teachers } from "../app/database";
import $ from "jquery";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import { Meteor } from "meteor/meteor";

export default {
  name: "Home",
  data() {
    return {
      favorites: [],
      show: false
    };
  },
  watch: {
    show(val) {}
  },
  methods: {
    updateView,
    async processHome() {
      var teachers = Session.get("favorites.teachers");
      teachers.forEach(function(page) {
        console.log("page");
        this.favorites[this.favorites.length] = page[0].params;
      }.bind(this));

      this.show = true;
      $("section").on("scroll", function() {
        console.log("Woah");
        if ($("section").scrollTop() >= 1.9 * window.rem()) {
          $(".bar").addClass("backshadow");
        } else {
          $(".bar").removeClass("backshadow");
        }
      });
    }
  },
  async mounted() {
    Tracker.autorun(
      function() {
        let loaded = Session.get("favorites.loaded");
        if (loaded) this.processHome();
      }.bind(this)
    );
  }
};
</script>

<style scoped lang="sass" src="../sass/home.sass"></style>
