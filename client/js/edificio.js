class Edificio {
    constructor(x, y) {
        //console.log(`x: ${x} y: ${y}`)
        let textures = [
            //"client/textures/techo_edificio.png",
            "client/textures/techo_edificio_2.png",
            "client/textures/techo_edificio1.png",
        ];
        let width = 3;
        let height = 2;
        this.width = width;
        this.height = height;
        let depth = 1;
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let texture_index = Math.floor(Math.random()*textures.length);
        let texture = loader.load(textures[texture_index]);
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          })
        //let random = Math.floor(Math.random() * 2 + 1);
        /*let material = new THREE.MeshPhongMaterial({
          transparent: true,
          map: texture
        });*/
        this.objeto = new THREE.Mesh(geometry, material);
        scene.add(this.objeto);

        this.objeto.position.x = x + width / 2;
        this.objeto.position.y = y + height / 2;
  }

  actualizar() {}
}
