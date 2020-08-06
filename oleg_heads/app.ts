import { Bodies, Engine, World, Render, MouseConstraint, Events, Composite } from 'matter-js'

const canvas = document.getElementById('c') as HTMLCanvasElement

function createImage($string) {
  let drawing = document.createElement('canvas')

  drawing.width = 150
  drawing.height = 150

  let ctx = drawing.getContext('2d')

  ctx.fillStyle = 'yellow'
  //ctx.fillRect(0, 0, 150, 150);
  ctx.beginPath()
  ctx.rect(0, 55, 200, 48)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = 'black'
  ctx.font = '1rem sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText($string, 75, 90)
  // ctx.strokeText("Canvas Rocks!", 5, 130);

  return drawing.toDataURL('image/png')
}

const engine = Engine.create()

const world = engine.world

const render = Render.create({
  canvas,
  engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    background: 'white',
    wireframes: false,
  },
})

const mouseConstraint = MouseConstraint.create(engine, {
  element: canvas,
  // @ts-ignore
  constraint: {
    stiffness: 0.8,
    render: {
      visible: false,
    },
  },
})

let mouse = mouseConstraint.mouse
// @ts-ignore
mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
// @ts-ignore
mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)

World.add(world, mouseConstraint)

const head = Bodies.circle(window.innerWidth / 2, 0, 25, {
  density: 0.01,
  friction: 0.01,
  restitution: 0.8,
  render: {
    sprite: {
      texture: '/oleg_heads/oleg.png',
      xScale: 1,
      yScale: 1,
    },
  },
})

World.add(world, head)

const floor = Bodies.rectangle(0, window.innerHeight, window.innerWidth * 2, 10, {
  isStatic: true,
})

World.add(world, floor)

const leftWall = Bodies.rectangle(0, 0, 10, window.innerHeight * 2, {
  isStatic: true,
})

World.add(world, leftWall)

const rightWall = Bodies.rectangle(window.innerWidth, 0, 10, window.innerHeight * 2, {
  isStatic: true,
})

World.add(world, rightWall)

const button = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 200, 60, {
  isStatic: true,
  render: {
    sprite: {
      texture: createImage('Родить Олега'),
    },
  },
})

World.add(world, button)

Engine.run(engine)
Render.run(render)

const rand = () => Math.floor(Math.random() * 200)

const addHead = () => {
  const head = Bodies.circle(window.innerWidth / 2 + rand(), 0, 40, {
    density: 0.01,
    friction: 0.01,
    restitution: 0.8,
    render: {
      sprite: {
        texture: '/oleg_heads/oleg.png',
        xScale: 1,
        yScale: 1,
      },
    },
  })

  World.add(world, head)
}
let clicked = false

const draw = () => {
  if (mouseConstraint.body && mouseConstraint.body.id === 6) {
    if (window.innerWidth / world.bodies.length <= 5.675) {
      button.render.sprite.texture = createImage('Принять участие')
      if (clicked) {
        if (!document.getElementById('join')) {
          const bg = document.createElement('div')

          bg.id = 'bg'

          const join = document.createElement('button')

          join.id = 'join'

          join.textContent = 'Принять участие'

          join.onclick = () => visit('excuse_me')

          bg.appendChild(join)

          document.body.appendChild(bg)
        }
      }

      clicked = true
    }
    addHead()
  }

  requestAnimationFrame(draw)
}

draw()
