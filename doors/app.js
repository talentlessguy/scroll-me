import * as THREE from 'three'
import font from 'three/examples/fonts/optimer_regular.typeface.json'
import { AmbientLight, DirectionalLight } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

var WIDTH = window.innerWidth - 10
var HEIGHT = window.innerHeight - 10

var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(WIDTH, HEIGHT)
renderer.setClearColor(0xdddddd, 1)
document.body.appendChild(renderer.domElement)

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT)
camera.position.z = 25
camera.rotation.x = -0.2

scene.add(new AmbientLight('white', 0.4))

const light = new DirectionalLight('white', 0.6)

light.position.set(0, 0, 10)

scene.add(light)

var controls = new PointerLockControls(camera, renderer.domElement)

scene.add(camera)

document.body.onclick = () => controls.lock()

scene.add(controls.getObject())

function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()

const makeDoor = (label, position) => {
  const door = new THREE.Group()

  var doorGeometry = new THREE.BoxGeometry(6, 10, 3)

  var basicMaterial = new THREE.MeshPhongMaterial({ color: '#AC6C48' })

  var cube = new THREE.Mesh(doorGeometry, basicMaterial)

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

var prevTime = performance.now()
var velocity = new THREE.Vector3()
var direction = new THREE.Vector3()

var moveForward = false
var moveBackward = false
var moveLeft = false
var moveRight = false
var canJump = false

var onKeyDown = function (event) {
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

var onKeyUp = function (event) {
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

function animate() {
  requestAnimationFrame(animate)

  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position)
    raycaster.ray.origin.y -= 10

    var intersections = raycaster.intersectObjects(doorObjects)

    console.log(intersections)

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

    if (controls.getObject().position.y < 10) {
      velocity.y = 0
      controls.getObject().position.y = 4

      canJump = true
    }

    prevTime = time
  }
}

const btn = new THREE.Group()

const btnGeom = new THREE.BoxGeometry(16, 8, 2)

const btnMaterial = new THREE.MeshPhongMaterial({ color: 'yellow' })

const btnTextGeom = new THREE.TextGeometry('Prinyat Uchastie', {
  size: 1,
  font: new THREE.Font(font),
  height: 0.3,
})

const btnMesh = new THREE.Mesh(btnGeom, btnMaterial)

btn.add(btnMesh)

const textMesh = new THREE.Mesh(btnTextGeom, new THREE.MeshPhongMaterial({ color: 'black' }))

textMesh.position.z = 1

textMesh.position.x = -4

btn.add(textMesh)

btn.position.z = 100

scene.add(btn)

animate()

setTimeout(() => {
  visit('contest')
}, 7500)
