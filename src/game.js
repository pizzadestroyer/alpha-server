const THREE = require('three')
const emitter = require('./events')

let gameObjects = []
let tick = 0

gameloop()

function update() {
    emitter.emit('gameObjects', JSON.stringify(gameObjects))
}

function gameloop() {
    setTimeout(gameloop, 1000)
    update()
    tick++
}

function addPlayer(id) {
    let player = {
        id: id,
        position: new THREE.Vector3(),
        rotation: new THREE.Vector3()
    }
    gameObjects.push(player)
}

emitter.on('player connected', (data) => {
    addPlayer(data)
})

emitter.on('player disconnected', (data) => {
    let index = gameObjects.findIndex((object) => {
        return object.id === data
    })
    gameObjects.splice(index, 1)
})

emitter.on('player moved', (data) => {
    let player = JSON.parse(data)
    let index = gameObjects.findIndex((object) => {
        return object.id === player.id
    })
    gameObjects[index] = player
})