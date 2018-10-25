class Zombie {
    constructor( x, y) {
        let width = 1
        let height = 1

        let geometry = new THREE.PlaneGeometry( width, height)
        let texture = loader.load("textures/zombie.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            transparent: true,
            map: texture
          });
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x + width/2;
        this.objeto.position.y = y + height/2;
        this.objeto.position.z = 2;

    }

    actualizar() {
    }
    
}