class Jugador {
    constructor() {
        this.balas = []

        let radio = 1;
        let segmentosAnchura = 32;
        let segmentosAltura = 32;

        let geometry = new THREE.SphereGeometry( radio, segmentosAnchura, segmentosAltura)
        let texture = loader.load("textures/jugador.png")
        //let material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
            map: texture
          });
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto);

        this.objeto.rotation.y += 6;
        
        //window.addEventListener("click", jugador1.disparar )
    }

    actualizar() {
        for(let bala of this.balas){
            bala.actualizar()
        }
    }

    disparar() {
        let angulo = Math.floor(Math.random() * 360)
        let bala = new Bala(angulo)
        
        this.balas.push(bala)
    }
    
}