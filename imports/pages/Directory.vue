<template>
  <section>
    <v-subheader>{{ title }}</v-subheader>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-list-tile :key="index" v-on:click="updateView('teacher',[item.id,item.school])">
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title>
              <span>{{item.subtitle}}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </section>
</template>
<style scoped lang="sass" src="../sass/directory.sass"></style>
<script>
import showdown from "showdown";
import { updateView } from "../app/methods";
import { Teachers } from "../app/database";

export default {
  name: "Directory",
  data() {
    return {
      title: "",
      items: []
    };
  },
  methods: {
    updateView
  },
  async created() {
    var list = await Teachers()[this.$route.params.name]();
    if (list !== {}) {
      console.log(list);
      list.forEach(
        function(item, index) {
          let currentItem = {};
          currentItem.id = item.id;
          item = item.fields;
          currentItem.avatar = item["Media"][0].url;
          currentItem.title = item["First name"] + " " + item["Last name"];
          currentItem.subtitle = item["Short desc"];
          currentItem.school = item["School"];
          this.items[this.items.length] = currentItem;
        }.bind(this)
      );
    }
    this.title = "Directory";
  }
};
</script>
