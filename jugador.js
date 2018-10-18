class Jugador {
    constructor() {
        this.balas = []

        let radio = 1;
        let segmentosAnchura = 32;
        let segmentosAltura = 32;

        let geometry = new THREE.SphereGeometry( radio, segmentosAnchura, segmentosAltura)
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} )
        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto);
        
        //window.addEventListener("click", jugador1.disparar )
    }

    actualizar() {
        for(let bala of this.balas){
            bala.actualizar()
        }
    }

    disparar() {
        let angulo = Math.floor(Math.random() * Math.PI);
        let bala = new Bala(angulo,this.objeto.position);
        
        this.balas.push(bala)
    }
    
}