class Zombie {
    constructor( ruta ) {

        this.movimientoLateral = 0;
        this.cambioMovimiento = 0.05;
        this.aux_movimientoLateral = 1;

        this.LEFT = "LEFT";
        this.RIGHT = "RIGHT";
        this.UP = "UP";
        this.DOWN = "DOWN";

        this.finished = false;

        this.speed = 0.005 + Math.random()*0.01;
        this.ruta = ruta.reverse();

        this.origen = this.ruta.pop();
        this.destino = this.ruta.pop();

        this.to_destroy = false;


        let x = this.origen[0];
        let y = this.origen[1];

        let width = 1
        let height = 1

        this.radius = width*0.55;

        let geometry = new THREE.PlaneGeometry( width, height)
        let texture = loader.load("client/textures/zombie.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            transparent: true,
            map: texture
          });

        this.objeto = new THREE.Mesh( geometry, material)
        scene.add(this.objeto)

        this.objeto.position.x = x;
        this.objeto.position.y = y;
        this.objeto.position.z = 2;

        
        // ROTATION
        this.rotarADestino(this.origen,this.destino);

    }

    rotarADestino(origen,destino) {
        if (origen[0] > destino[0]) {
            this.objeto.rotation.z = Math.PI;
            this.direction = this.LEFT;
        }
        if (origen[1] > destino[1]) {
            this.objeto.rotation.z = -Math.PI/2.0;
            this.direction = this.DOWN;
        }
        if (origen[1] < destino[1]) {
            this.objeto.rotation.z = Math.PI/2.0;
            this.direction = this.UP;
        }
    }

    actualizar() {
        if (this.finished) return;
        let change_direction = false;
        switch (this.direction) {
            case 'DOWN':
                this.objeto.position.y -= this.speed;
                if (this.objeto.position.y < this.destino[1] ) change_direction = true;
                break;
            case 'LEFT':
                this.objeto.position.x -= this.speed;
                if (this.objeto.position.x < this.destino[0] ) change_direction = true;
                break;
            case 'UP':
                this.objeto.position.y += this.speed;
                if (this.objeto.position.y > this.destino[1] ) change_direction = true;
                break;
        }

        if (change_direction) {
            if (this.ruta.length == 0) {
                this.termino();
                return;
            }
            var next = this.ruta.pop();
            this.origen = this.destino;
            this.destino = next;
            this.objeto.position.x = this.origen[0];
            this.objeto.position.y = this.origen[1];
            this.rotarADestino(this.origen,this.destino)
        }

        if( this.movimientoLateral == 5 || this.movimientoLateral == -5){
            this.cambioMovimiento = -this.cambioMovimiento;
            this.aux_movimientoLateral = -this.aux_movimientoLateral;
        }

        this.objeto.rotation.z += this.cambioMovimiento;

        this.movimientoLateral += this.aux_movimientoLateral;
    }

    termino() {
        this.finished = true;
    }

    colision(x,y) {
        //console.log(Math.sqrt( (x - this.objeto.position.x )**2 + (y - this.objeto.position.y )**2 ));
        if ( Math.sqrt( (x - this.objeto.position.x )**2 + (y - this.objeto.position.y )**2 ) < this.radius ) {
            return true;
        }
        return false;
    }

    destruir() {
        scene.remove(this.objeto);
        this.to_destroy = true;
    }
    
}