<template>
  <p class="star">
    <i class="material-icons" data-back="true" v-on:click="addFavorite()" v-if="!fav">star_border</i>
    <i class="material-icons" data-back="true" v-on:click="removeFavorite(item['_id'])" v-if="fav">star</i>
  </p>
</template>


<style lang="sass" scoped>
p.star
  font-size: 1.3rem
  margin: 0
  display: inline-block
  position: absolute
  top: 44px
  right: 2.875rem
  i
    font-size: 22px
    transform: scale(1.2)
</style>

<script>
import { addFavorite, removeFavorite } from "../app/methods";

export default {
  methods: {
    addFavorite,
    removeFavorite
  },
  props: ['fav','item']
}
</script>

