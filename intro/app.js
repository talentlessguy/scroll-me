const shrink = () => {
  const main = document.querySelector('main')

  main.style.width = '80vw'
  main.style.height = '80vh'
  main.style.overflowY = 'scroll'

  const btn = document.createElement('button')

  btn.innerText = 'Принять участие'

  btn.id = 'join'

  main.scrollTo({ top: 0 })

  main.appendChild(btn)
}
