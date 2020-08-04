const context = new AudioContext()
const video = context.createMediaElementSource(document.getElementById('v') as HTMLMediaElement)
const analyser = context.createAnalyser() //we create an analyser
analyser.smoothingTimeConstant = 0.9
analyser.fftSize = 512 //the total samples are half the fft size.
video.connect(analyser)
analyser.connect(context.destination)
const ctx = (document.getElementById('c') as HTMLCanvasElement).getContext('2d')

function draw() {
  let array = new Uint8Array(analyser.fftSize)
  analyser.getByteTimeDomainData(array)

  ctx.clearRect(0, 0, 512, 64)

  let average = 0
  let max = 0
  for (let i = 0; i < array.length; i++) {
    let a = Math.abs(array[i] - 128)
    average += a
    max = Math.max(max, a)
  }

  average /= array.length

  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, average * 20, 50)
  ctx.fillStyle = 'blue'
  ctx.fillRect(average * 10, 0, average * 20 - max, 50)

  ctx.fill()

  requestAnimationFrame(draw)
}
draw()

const input = document.querySelector('input')

const btn = document.createElement('button')

btn.id = 'join'

btn.onclick = () => visit('final')

btn.textContent = 'Принять участие'

video.mediaElement.onplaying = () => {
  input.onchange = (e) => {
    const val = (e.currentTarget as HTMLInputElement).value

    if (parseInt(val) >= 27 && parseInt(val) <= 29) {
      document.body.appendChild(btn)
    } else {
      try {
        document.body.removeChild(btn)
      } catch {}
    }
  }
}
