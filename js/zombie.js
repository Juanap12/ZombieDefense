class Zombie {
    constructor( x, y) {
        let width = 3
        let height = 3

        let geometry = new THREE.PlaneGeometry( width, height)
        let texture = loader.load("textures/zombie.png")
        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            //transparent: true,
            map: texture
          });

        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x + width/2;
        this.objeto.position.y = y + height/2;

    }

    actualizar() {
        this.objeto.rotation.x += 1;
        this.objeto.rotation.y += 1;
        this.objeto.rotation.z += 1;
    }
    
}