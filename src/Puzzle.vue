<template>
  <div class="box">
    <h3>当前使用步数 {{steps}}</h3>

    <ul class="puzzle-wrap">
      <li v-for="(puz, index) in puzzles" class="puzzle" :class="{'puzzle-empty': !puz }" @click="moveFn(index)">
        {{ puz }}
      </li>
    </ul>

    <button class="reset" type="button" @click="paint">重置</button>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        steps: 0,
        puzzles: []
      }
    },
    methods: {
      moveFn(index) {
        /**
         * 1 2 3
         * 4 5 6
         * 7 8 9
         */

        debugger

        let puzzles = this.puzzles
        let length = puzzles.length

        if (puzzles[index] === null)
          return

        let up = index - 3
        let left = index - 1
        let right = index + 1
        let down = index + 3

        if (up >= 0 && check(up)) {
          swap(up)
        } else if (left >= 0 && index % 3 !== 0 && check(left)) {
          swap(left)
        } else if (right < length && index % 3 !== 2 && check(right)) {
          swap(right)
        } else if (down < length && check(down)) {
          swap(down)
        } else {
          return
        }

        this.steps++;

        if (overgame()) {
          this.$nextTick(function() {
            alert('游戏结束！')
          })
        }

        function check(i) {
          return puzzles[i] === null;
        }

        function swap(target) {
          let tmp = puzzles[index]
          puzzles[index] = puzzles[target]
          puzzles[target] = tmp
        }

        function overgame() {
          let p = puzzles[0];
          if (p === null)
            return false
          for (let i = 1; i < length; i++) {
            if (i !== length - 1 && puzzles[i] < p)
              return false

            if (puzzles[i] === null && i !== length - 1)
              return false

            p = puzzles[i]
          }

          return true
        }
      },
      paint() {
        let size = 8;
        let puzzles = []
        for (let i = 0; i < size; i++) {
          puzzles.push(i + 1)
        }

        for (let i = 0; i < size * 2; i++) {
          let x = Math.floor(Math.random() * size)
          let y = Math.floor(Math.random() * size)

          let tmp = puzzles[x]
          puzzles[x] = puzzles[y]
          puzzles[y] = tmp
        }

        puzzles.push(null)

        this.puzzles = puzzles
        this.steps = 0
      }
    },

    created() {
      this.paint()
    }
  }
</script>

<style>
  .puzzle-wrap {
    width: 450px;
    height: 450px;
    margin-bottom: 40px;
    padding: 0;
    background: #ccc;
    list-style: none;
  }
  
  .puzzle {
    float: left;
    width: 150px;
    height: 150px;
    font-size: 20px;
    background: #f90;
    text-align: center;
    line-height: 150px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px;
    text-shadow: 1px 1px 1px #b9b4b4;
    cursor: pointer;
  }
  
  .puzzle-empty {
    background: #ccc;
    box-shadow: inset 2px 2px 18px;
  }
  
  .reset {
    width: 450px;
    height: 50px;
  }
</style>