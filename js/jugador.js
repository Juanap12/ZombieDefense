class Jugador {
    constructor(x, y) {
        console.log(x+""+y)
        this.balas = []

        this.width = 2
        this.height = 2

        let radioSuperior = width/2
        let radioInferior = width/2
        let altura = 1
        let segmentosRadiales = 60

        let geometry = new THREE.CylinderGeometry( radioSuperior, radioInferior, altura, segmentosRadiales)
        let texture = loader.load("textures/jugador.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            transparent: true,
            map: texture
          });
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x + width/2;
        this.objeto.position.y = y + height/2;

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