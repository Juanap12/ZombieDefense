class Edificio {
    constructor(x, y) {
        let width = 3
        let height = 2
        let depth = 1
        let geometry = new THREE.BoxGeometry(width, height, depth)
        let texture = loader.load("textures/techo_edificio.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          })
        this.objeto = new THREE.Mesh(geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x;
        this.objeto.position.y = y;
    }

    actualizar() {
    }
}