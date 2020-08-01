let counter = 0

const inc = () => {
  if (counter + 1 == 10) {
    const btn = document.createElement('button')
    btn.id = 'join'
    btn.innerText = 'Принять участие'
    btn.onclick = () => visit('doors')
    document.body.appendChild(btn)
  }
  counter++

  document.getElementsByTagName('span')[0].innerText = `${counter}`
}
