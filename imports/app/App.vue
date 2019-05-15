<template>
  <main>
    <transition :name="transitionName">
      <router-view />
    </transition>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.params.prev);
      this.transitionName = !this.$route.params.prev ? "next" : "prev";
    }
  }
};
</script>

<style>
main {
  height: calc(100% - 10px);
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

main > section {
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
