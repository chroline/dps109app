<template>
  <v-app>
    <div :class="{'bar':true,'transparent':clearHeader}">
      <v-scroll-x-reverse-transition leave-absolute>
        <p v-on:click="updateView('back')" v-if="prev && clearHeader" class="pageTitle">
          <BackButton/>
        </p>
      </v-scroll-x-reverse-transition>
      <v-scroll-x-reverse-transition leave-absolute>
        <p v-if="!prev && title == 'Home'" class="pageTitle">{{ title }}</p>
      </v-scroll-x-reverse-transition>
      <v-scroll-x-reverse-transition leave-absolute>
        <p
          v-on:click="updateView('back')"
          v-if="!clearHeader && title !== 'Home'"
          class="pageTitle"
        >
          <BackButton/>
          {{ title }}
        </p>
      </v-scroll-x-reverse-transition>
      <v-fade-transition>
        <Star v-if="title !== 'Home' && title !== 'Directory' && fav !== null" :fav="fav" :item="item"/>
      </v-fade-transition>
    </div>
    <main>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    </main>
  </v-app>
</template>

<script>
import $ from "jquery";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";
import * as methods from "/imports/app/methods";
import BackButton from "/imports/components/back-button.vue";
import Star from "/imports/components/favorite.vue";

export default {
  name: "App",
  data: {
    transitionName: "",
    fav: null,
    item: null,
    prev: false,
    title: "",
    clearHeader: false
  },
  components: {
    BackButton,
    Star
  },
  methods: $.extend({}, methods),
  watch: {
    $route(to, from) {
      $(".bar").removeClass("backshadow");
      this.barUpdate(this.$route.name, this);
      this.transitionName = this.$route.params.prev == true ? "prev" : "next";
      this.fav = null;
      Meteor.call(
        "isFavorite",
        [window.breadcrumbs[window.breadcrumbs.length - 1]],
        function(e, r) {
            console.log(r);
          if(r.ok) {
            this.fav = true;
            this.item = r.item;
          }
          else this.fav = false;
        }.bind(this)
      );
    }
  },
  created() {
    this.barUpdate(this.$route.name, this);
    Tracker.autorun(function() {
      var loaded = Session.get('favorites.loaded');
      if(loaded !== false) {
        Meteor.call(
          "isFavorite",
          [window.breadcrumbs[window.breadcrumbs.length - 1]],
          function(e, r) {
            console.log(r);
          if(r.ok) {
            this.fav = true;
            this.item = r.item;
          }
          else this.fav = false;
          }.bind(this)
        );
      }
    }.bind(this))
  }
};
</script>

<style>
main {
  height: calc(100% - 60px);
  width: 100%;
  display: grid;
  grid-template: "main";
  flex: 1;
  background-color: white;
  position: absolute;
  top: 0;
  z-index: 0;
  overflow-x: hidden;
}

main > div {
  position: absolute;
  top: 0;
  width: 100%;
}

section {
  position: absolute;
  z-index: 0;
  background: white;
  width: 100%;
  height: 100%;
}

main > :first-child {
  z-index: 1;
}

/* Transitions */

.next-leave-to {
  animation: leaveToLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 0;
}

.next-enter-to {
  animation: enterFromRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}

.prev-leave-to {
  animation: leaveToRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}

.prev-enter-to {
  animation: enterFromLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 0;
}

@keyframes leaveToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-25%);
    filter: brightness(0.5);
  }
}

@keyframes enterFromLeft {
  from {
    transform: translateX(-25%);
    filter: brightness(0.5);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes leaveToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes enterFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
