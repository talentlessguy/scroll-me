const ANSWER = 126

const ctrl = document.getElementById('ctrl')

const keys = [...new Array(10).keys(), '+', '-', '*', '/', '=']

let count = 0

let cmdCount = 0

let expr = ''

for (const key of keys) {
  const btn = document.createElement('button')

  btn.innerText = `${key}`

  btn.onclick = (e) => {
    btn.style.transform = `translate(0, 100vh) rotate(-70deg)`
    cmdCount++

    if (key === '=') {
      count += eval(expr)
    } else if (key === 0 || key === 1 || cmdCount > 4) {
      for (const child of Array.from(ctrl.children)) {
        child.style.transform = `translate(0, 100vh) rotate(-70deg)`
      }
    } else if (count === ANSWER) {
      const join = document.createElement('button')

      join.id = 'join'
    } else {
      expr += key
    }

    document.querySelector('output').textContent = `${count}`
  }

  ctrl.appendChild(btn)
}
