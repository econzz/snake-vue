<template>
  <div id="app">
    <SnakeGame/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnakeGame from './components/SnakeGame.vue';

@Component({
  components: {
    SnakeGame,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  margin: 0;
  
}
html, body {

  overflow: hidden;
  touch-action: none;
  -ms-touch-action: none;

  width:100%;
  height:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #2c3e50;
  position:fixed;
  width: 100%;
    height: 100%;
}

</style>
