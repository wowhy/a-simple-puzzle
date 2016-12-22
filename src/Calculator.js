import compute from './compute.js'

function computed($this) {
  return $this.result !== null
}

function isNumber(symbol) {
  let number = symbol - '0'
  return number >= 0 && number <= 9
}

class Calculator {
  constructor() {
    this.symbols = ['0']
    this.result = null
  }

  number(val) {
    if (computed(this)) {
      this.clear()
    }

    if (this.symbols.length === 1 && this.symbols[0] === '0') {
      this.symbols[0] = val
      return
    }

    this.symbols.push(val)
  }
  point() {
    if (computed(this)) {
      this.clear()
    }

    let last = this.symbols[this.symbols.length - 1]
    if (isNumber(last)) {
      for (let i = this.symbols.length - 2; i > 0; --i) {
        last = this.symbols[i]
        if (!isNumber(last)) {
          break
        }
      }

      if (last !== '.') {
        this.symbols.push('.')
      }
    } else if (last !== '.') {
      this.symbols.push('0')
      this.symbols.push('.')
    }
  }
  plus() {
    let last = this.symbols[this.symbols.length - 1]
    if (isNumber(last)) {
      this.result = null
      this.symbols.push('+')
    } else {
      this.symbols[this.symbols.length - 1] = '+'
    }
  }
  minus() {
    let last = this.symbols[this.symbols.length - 1]
    if (isNumber(last)) {
      this.result = null
      this.symbols.push('-')
    } else if (last === '.' || last === '+') {
      this.symbols[this.symbols.length - 1] = '-'
    } else if (last === '-') {
      // nothing to do
    } else {
      this.result = null
      this.symbols.push('-')
    }
  }
  div() {
    let last = this.symbols[this.symbols.length - 1]
    if (isNumber(last)) {
      this.result = null
      this.symbols.push('/')
    } else {
      this.symbols[this.symbols.length - 1] = '/'
    }
  }
  multi() {
    let last = this.symbols[this.symbols.length - 1]
    if (isNumber(last)) {
      this.result = null
      this.symbols.push('*')
    } else {
      this.symbols[this.symbols.length - 1] = '*'
    }
  }
  clear() {
    this.symbols = ['0']
    this.result = null
  }
  back() {
    if (!computed(this)) {
      this.symbols.pop()

      if (!this.symbols.length) {
        this.clear()
      }
    } else {
      this.clear()
    }
  }
  leftBracket() {
    if (this.symbols.length === 1 && this.symbols[0] === '0') {
      this.symbols[0] = '('
    } else {
      let last = this.symbols[this.symbols.length - 1]
      if (isNumber(last) || last === '.') {
        return
      }

      this.symbols.push('(')
    }
  }
  rightBracket() {
    let last = this.symbols[this.symbols.length - 1]
    if (!isNumber(last) && last !== ')') {
      return
    }

    let leftCounts = 0
    let rightCounts = 0
    for (let i = 0; i < this.symbols.length; i++) {
      if (this.symbols[i] === '(') {
        leftCounts++
      } else if (this.symbols[i] === ')') {
        rightCounts++
      }
    }

    if (rightCounts < leftCounts) {
      this.symbols.push(')')
    }
  }

  expr() {
    return this.symbols.join('')
  }
  compute() {
    try {
      this.result = compute(this.expr()) + ''
      this.symbols = (this.result + '').split('')
    } catch (ex) {
      this.result = '表达式错误'
    }

    return this.result
  }
}

export default Calculator
