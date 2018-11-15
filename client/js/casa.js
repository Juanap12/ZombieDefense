class Casa {
  constructor(x, y) {
    let width = 1;
    let height = 1;
    let depth = 1;
    this.width = width;
    this.height = height;
    let geometry = new THREE.PlaneGeometry(width, height, depth);

    let random = Math.floor(Math.random() * 3 + 1);
    
    let texture;
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
    }

    let material = new THREE.MeshPhongMaterial({
        transparent: true,
      map: texture
    });
    this.objeto = new THREE.Mesh(geometry, material);
    scene.add(this.objeto);

    this.objeto.position.x = x + width / 2;
    this.objeto.position.y = y + height / 2;
  }

  actualizar() {}
}
