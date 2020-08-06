const cont = document.getElementById('code')

for (let i = 0; i < 200; i++) {
  const img = document.createElement('img')

  img.src = '/final/oleg.png'
  img.style.animation = 'rotating ' + ((i % 2) + 1) * 1110 + 'ms' + ' linear infinite'
  cont.appendChild(img)
}
