<template>
  <div>
    <div>
      <a href="javascript:void(0);" @click="current = 'puzzle'">拼图</a>
      <a href="javascript:void(0);" @click="current = 'calc'">计算器</a>
    </div>
    <div v-if="current" :is="current"></div>
  </div>
</template>

<script>
  import Puzzle from './Puzzle.vue'
  import Calc from './Calc.vue'
  export default {
    components: {
      Puzzle,
      Calc
    },
    data() {
      return {
        current: ''
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  
  .box {
    width: 450px;
    margin: 50px auto 0;
  }
</style>