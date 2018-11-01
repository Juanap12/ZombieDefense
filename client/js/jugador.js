class Jugador {
    constructor(x, y) {
        console.log(x+""+y);
        this.balas = []
        let width = 2
        let height = 2
        this.width = width;
        this.height = height;

        let radioSuperior = width/2
        let radioInferior = width/2
        let altura = 1
        let segmentosRadiales = 60

        let geometry = new THREE.CylinderGeometry( radioSuperior, radioInferior, altura, segmentosRadiales)
        let texture = loader.load("client/textures/jugador.png")
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

    disparar(theta) {
        //let angulo = Math.floor(Math.random() * 2*Math.PI)
        //let angulo = Math.floor(theta * 2 * Math.PI)
        let bala = new Bala(theta,this.objeto.position)

        this.balas.push(bala)
    }

    setPosY(data) {
      this.objeto.rotation.y = -Math.PI/2 + (data/600*Math.PI/2);
    }

    setPosY2(data) {
      this.objeto.rotation.y = Math.PI/2 + (data/600*Math.PI/2);
    }

    getPosY(){
      return this.objeto.rotation.y;
    }
    
}