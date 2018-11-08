class Bala {
    constructor(angulo,posicion){
        this.angulo = angulo;
        this.velocidad = 0.1;

        let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1);
        let material = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh( geometry, material);
        scene.add(this.cube);

        this.distancia = 0;
        this.posicion_inicial = posicion;
        this.cube.position.x = this.posicion_inicial.x;
        this.cube.position.y = this.posicion_inicial.y;

        this.to_destroy = false;
    }

    actualizar(){
        this.cube.position.x = this.posicion_inicial.x + this.distancia * Math.cos(this.angulo);
        this.cube.position.y = this.posicion_inicial.y + this.distancia * Math.sin(this.angulo);
        this.distancia += this.velocidad;

        if (this.cube.position.x > WIDTH/2) this.destruir();
        if (this.cube.position.x <-WIDTH/2) this.destruir();
        if (this.cube.position.y <-HEIGHT/2) this.destruir();
        if (this.cube.position.y > HEIGHT/2) this.destruir();
    }

    destruir() {
        scene.remove(this.cube);
        this.to_destroy = true;
    }
}