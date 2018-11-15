class Casa {
    constructor(x,y) {
        console.log("CASA")
        let textures = [
            "client/textures/techo_casa.png",
            "client/textures/techo_casa_2.png",
            "client/textures/techo_casa_3.png",
            "client/textures/techo_casa_4.png",
            "client/textures/techo_casa_5.png",
            "client/textures/techo_casa_6.png",
        ]; 
    let width = 1;
    let height = 1;
    let depth = 1;
    this.width = width;
    this.height = height;
    let geometry = new THREE.PlaneGeometry(width, height, depth);
    let texture_index = Math.floor(Math.random()*textures.length);
    let texture = loader.load(textures[texture_index]);
    let material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: texture
      })

    /*let random = Math.floor(Math.random() * 3 + 1);
    switch (random) {
      case 1:
        texture = loader.load("client/textures/techo_casa.png");
        break;
      case 2:
        texture = loader.load("client/textures/techo_casa_2.png");
        break;
      case 3:
        texture = loader.load("client/textures/techo_casa_3.png");
        break;
    }*/

    //let material = new THREE.MeshPhongMaterial({
    //    transparent: true,
    //  map: texture
    //});
    this.objeto = new THREE.Mesh(geometry, material);
    scene.add(this.objeto);

    this.objeto.position.x = x + width / 2;
    this.objeto.position.y = y + height / 2;
  }

  actualizar() {}
}
