function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1])
    }
  }
}

let idx = 0
let windows = []

if (!getQueryVariable('w')) {
  document.body.innerHTML = `<button id="spawn">
  Заспавнить окно
</button>`

  document.getElementById('spawn').onclick = () => {
    idx++

    const window = open(`${location.pathname}?w=${idx}`, `Окно ${idx}`, `height=450,width=400`)
    windows.push(window)

    setInterval(() => {
      const f = windows[0]
      const s = windows[1]

      if (f.screenY >= 50 && f.screenY <= 80 && f.screenX >= 745 && f.screenY <= 765) {
        if (s.screen)
      }
    })
  }
} else {
  let oldX = window.screenX,
    oldY = window.screenY

  let newX = screenX,
    newY = screenY

  setInterval(() => {
    if (oldX != window.screenX || oldY != window.screenY) {
      newX = screenX
      newY = screenY
    } else {
    }

    oldX = window.screenX
    oldY = window.screenY

    if (getQueryVariable('w') === '1') {
      if (!document.querySelector('main').firstChild) {
        const tube = document.createElement('div')

        tube.id = 'tube'

        const tubeHead = document.createElement('div')

        tubeHead.id = 'tube_head'

        document.querySelector('main').appendChild(tubeHead)
        document.querySelector('main').appendChild(tube)
      }

      let metric = document.querySelector('#metric')

      if (!metric) {
        metric = document.createElement('div')
        metric.id = 'metric'
      }

      metric.innerHTML = `
      X: ${newX}
      Y: ${newY}
      `
      document.querySelector('main').appendChild(metric)
    } else if (getQueryVariable('w') === '2') {
      // X: 960, Y: 600
      const tube = document.createElement('div')

      tube.id = 'tube'

      const tubeHead = document.createElement('div')

      tubeHead.id = 'tube_head'

      document.querySelector('main').appendChild(tube)
      document.querySelector('main').appendChild(tubeHead)
    }
  })
}
