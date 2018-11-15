class Casa {
    constructor(x,y) {
        let textures = [
            "client/textures/techo_casa.png",
            "client/textures/techo_casa1.png",
            "client/textures/techo_casa2.png",
            "client/textures/techo_casa3.png",
        ];
        let width = 1
        let height = 1
        let depth = 1
        this.width = width;
        this.height = height;
        let geometry = new THREE.BoxGeometry(width, height, depth)
        let texture_index = Math.floor(Math.random()*textures.length);
        let texture = loader.load(textures[texture_index]);
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          })
        this.objeto = new THREE.Mesh(geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x + width/2;
        this.objeto.position.y = y + height/2;
    }

    actualizar() {
    }
}