class Jugador {
    constructor() {
        this.balas = []

        let radio = 1
        let segmentosAnchura = 30
        let segmentosAltura = 30

        let geometry = new THREE.SphereGeometry( radio, segmentosAnchura, segmentosAltura)
        let texture = loader.load("textures/jugador.png")
        texture.offset.x = 0.25 // 0.0 - 1.0
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          });
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)
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