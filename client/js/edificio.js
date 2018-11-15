class Edificio {
  constructor(x, y) {
    let width = 3;
    let height = 2;
    this.width = width;
    this.height = height;
    let depth = 1;
    let geometry = new THREE.BoxGeometry(width, height, depth);

    let random = Math.floor(Math.random() * 2 + 1);
    let texture;
    switch (random) {
      case 1:
        texture = loader.load("client/textures/techo_edificio.png");
        break;
      case 2:
        texture = loader.load("client/textures/techo_edificio_2.png");
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
