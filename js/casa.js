class Casa {
    constructor() {
        let width = 1
        let height = 1
        let depth = 1
        let geometry = new THREE.BoxGeometry(width, height, depth)
        let texture = loader.load("textures/techo_casa.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          })
        this.objeto = new THREE.Mesh(geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x += 6;
    }

    actualizar() {
    }
}