let main = document.querySelector("main");
let index = Math.ceil(Math.random() * 12);
console.log(index);
for (let i = 0; i < 12; i++) {
  if (index != i) {
    let div = document.createElement("div");
    let btn = document.createElement("button");
    btn.innerText = "X";
    div.innerText = i;
    btn.onclick = (e) => {
      e.currentTarget.parentElement.remove();
    };
    div.appendChild(btn);
    main.appendChild(div);
  } else {
    let div = document.createElement("div");
    div.innerText = i;
    let btn = document.createElement("button");
    btn.innerText = "X";
    div.appendChild(btn);
    main.appendChild(div);
  }
}
console.log(main);

/*const main = document.querySelector('main')

  const btn = document.createElement('button')

  btn.innerText = 'X'

  btn.class = 'close'

  btn.onclick = () => {
    visit('scroll_to_top')
    location.reload()
  }

  main.scrollTo({ top: 0 })

  main.appendChild(btn)*/
