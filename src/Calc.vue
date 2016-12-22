<template>
  <div class="box">
    <div class="calc-conatiner">
      <div class="calc-result">
        <span class="calc-result-inner">{{result}}</span>
      </div>
      <div class="calc-body">
        <table>
          <tbody>
            <tr>
              <td><input type="button" class="calc-btn" @click="press('(')" value="("></td>
              <td><input type="button" class="calc-btn" @click="press(')')" value=")"></td>
              <td><input type="button" class="calc-btn" @click="press('C')" value="C"></td>
              <td><input type="button" class="calc-btn" @click="press('Bk')" value="Bk"></td>
            </tr>
            <tr>
              <td><input type="button" class="calc-btn" @click="press('7')" value="7"></td>
              <td><input type="button" class="calc-btn" @click="press('8')" value="8"></td>
              <td><input type="button" class="calc-btn" @click="press('9')" value="9"></td>
              <td><input type="button" class="calc-btn" @click="press('/')" value="÷"></td>
            </tr>
            <tr>
              <td><input type="button" class="calc-btn" @click="press('4')" value="4"></td>
              <td><input type="button" class="calc-btn" @click="press('5')" value="5"></td>
              <td><input type="button" class="calc-btn" @click="press('6')" value="6"></td>
              <td><input type="button" class="calc-btn" @click="press('*')" value="×"></td>
            </tr>
            <tr>
              <td><input type="button" class="calc-btn" @click="press('1')" value="1"></td>
              <td><input type="button" class="calc-btn" @click="press('2')" value="2"></td>
              <td><input type="button" class="calc-btn" @click="press('3')" value="3"></td>
              <td><input type="button" class="calc-btn" @click="press('-')" value="-"></td>
            </tr>
            <tr>
              <td><input type="button" class="calc-btn" @click="press('0')" value="0"></td>
              <td><input type="button" class="calc-btn" @click="press('.')" value="."></td>
              <td><input type="button" class="calc-btn" @click="press('=')" value="="></td>
              <td><input type="button" class="calc-btn" @click="press('+')" value="+"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Calculator from './Calculator.js'

  const calc = new Calculator()

  export default {
    data() {
      return {
        result: calc.expr()
      }
    },
    methods: {
      press(symbol) {
        let flag = false
        switch (symbol) {
          case 'C':
            calc.clear()
            break

          case 'Bk':
            calc.back()
            break

          case '=':
            flag = true
            break

          case '+':
            calc.plus()
            break

          case '-':
            calc.minus()
            break

          case '*':
            calc.multi()
            break

          case '/':
            calc.div()
            break

          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            calc.number(symbol)
            break

          case '.':
            calc.point()
            break

          case '(':
            calc.leftBracket()
            break
          case ')':
            calc.rightBracket()
            break
        }

        if (flag) {
          this.result = calc.compute()
        } else {
          this.showExpr()
        }
      },
      showExpr() {
        let expr = calc.expr()
        this.result = expr.replace(/\*/g, '×').replace(/\//g, '÷')
      }
    }
  }
</script>

<style lang="css">
  .calc-conatiner {
    width: 310px;
    height: 345px;
    border: 1px solid #cdcdcd;
    padding: 10px;
    font-family: '微软雅黑';
  }
  
  .calc-result {
    border: 1px solid #0072c5;
    height: 58px;
    line-height: 58px;
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  span.calc-result-inner {
    float: right;
    overflow: auto;
    margin-right: 2px;
    white-space: nowrap;
  }
  
  input.calc-btn {
    width: 62px;
    height: 40px;
    cursor: pointer;
    font-size: 24px;
  }
  
  td {
    padding: 0 10px 10px 0;
  }
</style>