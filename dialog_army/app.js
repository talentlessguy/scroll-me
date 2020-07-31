let main = document.querySelector('main')
let index = Math.ceil(Math.random() * 12)
console.log(index)
for (let i = 0; i < 12; i++) {
  if (index != i) {
    let div = document.createElement('div')
    let btn = document.createElement('button')
    btn.innerText = 'X'
    div.innerText = `${i}`
    btn.onclick = (e) => {
      e.currentTarget.parentElement.remove()
    }
    div.appendChild(btn)
    main.appendChild(div)
  } else {
    let div = document.createElement('div')
    div.innerText = `${i}`
    let btn = document.createElement('button')
    btn.onclick = () => {
      if (Array.from(main.children).length === 1) {
        let oldBtn = document.querySelector('main div button')
        oldBtn.remove()
        let btn = document.createElement('button')
        btn.id = 'join'
        btn.innerText = 'Принять участие'
        btn.onclick = () => visit('cube_faces')
        const lastDiv = document.querySelector('main div')

        lastDiv.appendChild(btn)
      }
    }
    btn.innerText = 'X'
    div.appendChild(btn)
    main.appendChild(div)
  }
}
