class Jugador {
    constructor() {
        this.balas = new Array()
        let bala = new Bala(Math.random())
        this.balas.push(bala)
        let geometry = new THREE.BoxGeometry( 1, 1, 1)
        let material = new THREE.MeshNormalMaterial()
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
        let bala = new Bala(Math.random())
        
        this.balas.push(bala)
    }
    
}