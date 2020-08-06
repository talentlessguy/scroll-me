(() => {
  // app.ts
  const context = new AudioContext();
  const el = document.getElementById("v");
  const video = context.createMediaElementSource(el);
  const analyser = context.createAnalyser();
  analyser.smoothingTimeConstant = 0.9;
  analyser.fftSize = 512;
  video.connect(analyser);
  analyser.connect(context.destination);
  const ctx = document.getElementById("c").getContext("2d");
  function draw() {
    let array = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(array);
    ctx.clearRect(0, 0, 512, 64);
    let average = 0;
    let max = 0;
    for (let i = 0; i < array.length; i++) {
      let a = Math.abs(array[i] - 128);
      average += a;
      max = Math.max(max, a);
    }
    average /= array.length;
    document.getElementById("meter").textContent = average.toFixed(0);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, average * 20, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(average * 10, 0, average * 20 - max, 50);
    ctx.fill();
    requestAnimationFrame(draw);
  }
  draw();
  const input = document.querySelector("input");
  const btn = document.createElement("button");
  btn.id = "join";
  btn.onclick = () => visit("final");
  btn.textContent = "Принять участие";
  video.mediaElement.onplaying = () => {
    input.onchange = () => {
      const val = input.value;
      if (parseInt(val) >= 27 && parseInt(val) <= 29) {
        document.body.appendChild(btn);
      } else {
        try {
          document.body.removeChild(btn);
        } catch {
        }
      }
    };
  };
  const play = document.getElementById("play");
  play.onclick = () => el.play();
})();
