class Jugador {
    constructor() {
        this.balas = []

        let radioSuperior = 1
        let radioInferior = 1
        let altura = 1
        let segmentosRadiales = 30

        let geometry = new THREE.CylinderGeometry( radioSuperior, radioInferior, altura, segmentosRadiales)
        let texture = loader.load("textures/jugador.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          });
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)

        this.objeto.rotation.x += Math.PI/2;
    }

    actualizar() {
        for(let bala of this.balas){
            bala.actualizar()
        }
    }

    disparar() {
        let angulo = Math.floor(Math.random() * 2*Math.PI)
        let bala = new Bala(angulo,this.objeto.position)
        
        this.balas.push(bala)
    }
    
}