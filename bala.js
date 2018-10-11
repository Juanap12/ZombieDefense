class Bala {
    constructor(angulo){
        this.angulo = angulo

        let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1)
        let material = new THREE.MeshNormalMaterial()
        this.cube = new THREE.Mesh( geometry, material)
        scene.add(this.cube)

        this.velocidad = 0;
    }

    actualizar(){
        this.cube.position.x = this.velocidad * Math.cos(this.angulo)
        this.cube.position.y = this.velocidad * Math.sin(this.angulo)
        this.velocidad += 0.1
    }
}