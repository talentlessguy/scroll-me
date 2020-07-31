let counter = 0

const inc = () => {
  if (counter + 1 == 10) {
    visit('dialog_army')
  }
  counter++

  document.getElementsByTagName('span')[0].innerText = `${counter}`
}
