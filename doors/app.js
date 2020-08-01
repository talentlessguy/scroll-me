import * as THREE from 'three'
import font from 'three/examples/fonts/optimer_regular.typeface.json'
import { AmbientLight, DirectionalLight } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

let WIDTH = window.innerWidth - 10,
  HEIGHT = window.innerHeight - 10

let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(WIDTH, HEIGHT)
renderer.setClearColor(0xdddddd, 1)
document.body.appendChild(renderer.domElement)

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
camera.position.z = 25
camera.rotation.x = -0.2

scene.add(new AmbientLight('white', 0.4))

const light = new DirectionalLight('white', 0.6)

light.position.set(0, 0, 10)

scene.add(light)

let controls = new PointerLockControls(camera, renderer.domElement)

scene.add(camera)

document.body.onclick = () => controls.lock()

scene.add(controls.getObject())

const makeDoor = (label, position) => {
  const door = new THREE.Group()

  let doorGeometry = new THREE.BoxGeometry(6, 10, 0.5)

  let basicMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('/doors/texture.jpg') })

  let cube = new THREE.Mesh(doorGeometry, basicMaterial)

  door.add(cube)

  const textGeom = new THREE.TextGeometry(label, {
    font: new THREE.Font(font),
    size: 1,
    height: 0.3,
  })

  const text = new THREE.Mesh(textGeom, new THREE.MeshPhongMaterial({ color: 'black' }))

  text.position.y = 7.5
  text.position.x = -3.5

  door.position.set(position.x, position.y, position.z)

  door.add(text)

  return door
}

const doors = [
  {
    label: 'KMB',
    pos: -10,
  },
  {
    label: 'Algos',
    pos: 0,
  },
  {
    label: 'Frontend',
    pos: 10,
  },
]

const doorMeshes = []

const doorObjects = []

for (const d of doors) {
  const door = makeDoor(d.label, {
    x: d.pos,
    y: 2,
    z: 0,
  })

  doorObjects.push(door)
  doorMeshes.push(door)
}

let prevTime = performance.now()
let velocity = new THREE.Vector3()
let direction = new THREE.Vector3()

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let canJump = false

let onKeyDown = function (event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true
      break

    case 37: // left
    case 65: // a
      moveLeft = true
      break

    case 40: // down
    case 83: // s
      moveBackward = true
      break

    case 39: // right
    case 68: // d
      moveRight = true
      break

    case 32: // space
      if (canJump === true) velocity.y += 150
      canJump = false
      break
  }
}

let onKeyUp = function (event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false
      break

    case 37: // left
    case 65: // a
      moveLeft = false
      break

    case 40: // down
    case 83: // s
      moveBackward = false
      break

    case 39: // right
    case 68: // d
      moveRight = false
      break
  }
}

document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

for (let door of doorMeshes) scene.add(door)

const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10)

let visited = false

function animate() {
  requestAnimationFrame(animate)

  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position)
    raycaster.ray.origin.y -= 4

    const pos = controls.getObject().position

    console.log(pos)

    if (!visited) {
      if (pos.x >= -12.5 && pos.x <= -8 && pos.z <= 0) {
        visited = true
        visit('dialog_army')
      } else if (pos.z <= 0 && pos.x <= 2) {
        visited = true
        visit('contest')
      }
    }

    var intersections = raycaster.intersectObjects(doorObjects)

    var onObject = intersections.length > 0

    var time = performance.now()
    var delta = (time - prevTime) / 1000

    velocity.x -= velocity.x * 10.0 * delta
    velocity.z -= velocity.z * 10.0 * delta

    velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward)
    direction.x = Number(moveRight) - Number(moveLeft)
    direction.normalize() // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y)
      canJump = true
    }

    controls.moveRight(-velocity.x * delta)
    controls.moveForward(-velocity.z * delta)

    controls.getObject().position.y += velocity.y * delta // new behavior

    if (controls.getObject().position.y < 4) {
      velocity.y = 0
      controls.getObject().position.y = 4

      canJump = true
    }

    prevTime = time
  }
}

animate()

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()
