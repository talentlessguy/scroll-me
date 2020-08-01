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

  document.getElementById('spawn').onclick = (e) => {
    idx++

    e.currentTarget.textContent = 'Заспавнить ещё окно'

    const window = open(`${location.pathname}?w=${idx}`, `Окно ${idx}`, `height=450,width=400`)
    windows.push(window)

    if (windows.length === 2) {
      setInterval(() => {
        const f = windows[0]
        const s = windows[1]

        if (f.screenX === s.screenX) {
          windows[0].document.body.style.overflow = 'hidden'
          if (!windows[0].document.getElementById('join')) {
            const btn = document.createElement('button')
            btn.innerText = 'Принять участие'
            btn.id = 'join'

            btn.disabled = true
            windows[0].document.body.prepend(btn)

            setTimeout(() => {
              btn.style.transform = `translate(0, 200vh)`

              if (!windows[1].document.getElementById('join')) {
                const btn2 = document.createElement('button')
                btn2.innerText = 'Принять участие'

                btn2.id = 'join'

                btn2.onclick = () => visit('flipped')

                btn2.style.transition = '2s'
                btn2.style.transform = `translate(0, 120vh)`
                windows[1].document.body.prepend(btn2)
              }
            }, 100)
          }
        }
      })
    }
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

        tube.style.background = `url(/windows_tubes/toilet.png)`
        tube.style.backgroundRepeat = 'no-repeat'
        tube.style.backgroundSize = 'contain'

        document.querySelector('main').appendChild(tube)
      }
    } else if (getQueryVariable('w') === '2') {
      // X: 960, Y: 600
      if (!document.querySelector('main').firstChild) {
        const tube = document.createElement('div')

        tube.id = 'tube'

        const tubeHead = document.createElement('div')

        tubeHead.id = 'tube_head'

        document.body.style.alignContent = `align-self`
        tube.style.background = `rgba(0, 128, 0, 0.644)`
        tube.style.height = `200px`
        tubeHead.style.background = `rgba(0, 128, 0, 0.644)`
        tube.style.border = `5px solid black`
        tubeHead.style.border = `5px solid black`

        document.querySelector('main').appendChild(tube)
        document.querySelector('main').appendChild(tubeHead)
      }
    }
  })
}
