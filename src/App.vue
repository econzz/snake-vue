<template>
  <div id="app">
    
    <SnakeGame score="0"/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  background: #e1e1e1;
}

div#app {
    text-align: center;
    margin-top: 100px;
}

.game{
    height: 280px;
}

.px {
  width: 10px;
  height: 10px;
  background: #e5e5e5;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
      display: inline-block;
}
.px.col{
  display: block;
}

.snake{
  background: #333;
}

.food{
  background: blue;
}
</style>
