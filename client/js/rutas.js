var STREET_WIDTH = 1;
var ZOMBIE_WIDTH = 0.4;
class GeneradorRutas {
	constructor(m) {
		this.m = m;
		this.h = m.length;
		this.w = m[0].length;

		this.main_street = [this.w/2,0];
		this.upper_streets = [];
		this.lower_streets = [];

		for (var i = 0; i < m[0].length; i ++) {
			if (m[0][i] == STREET) {
				var position = [ i - this.w/2 + STREET_WIDTH/2,-this.h/2 ];
				//this.probar(position);
				this.lower_streets.push(position);
			}

			if (m[this.h - 1][i] == STREET) {
				var position = [ i - this.w/2 + STREET_WIDTH/2,this.h/2 ];
				//this.probar(position);
				this.upper_streets.push(position);
			}
		}

		//this.generarRutaZombie();
	}


	generarRutaZombie() {
		var i = Math.floor(Math.random()*(1 + this.upper_streets.length + this.lower_streets.length));

		var street_type = '';

		var path = [];
		let padding = STREET_WIDTH - ZOMBIE_WIDTH;

		if (i == 0) {
			var initial_position = this.main_street.slice();
			initial_position[1] += Math.random()*padding - padding/2
			path.push(initial_position);
	 	}
	 	else if (i <= this.upper_streets.length ) {
	 		var initial_position = this.upper_streets[i - 1].slice();
			initial_position[0] += Math.random()*padding - padding/2
	 		path.push(initial_position);
	 		path.push([initial_position[0], Math.random()*padding - padding/2]);
	 	}
	 	else {
	 		var initial_position = this.lower_streets[i - 1 - this.upper_streets.length].slice();
			initial_position[0] += Math.random()*padding - padding/2;
	 		path.push(initial_position);
	 		path.push([initial_position[0], Math.random()*padding - padding/2]);
	 	}

	 	var last_point = path[path.length - 1];
	 	path.push([ -this.w/2,last_point[1] ])

	 	//for (var i = 0; i < path.length; i++) this.probar(path[i],0x00FF00);
		return path;
	}


	probar(position, color=0xFF0000) {
		

		let geometry = new THREE.BoxGeometry(0.5, 0.5, 1)
        let texture = loader.load("textures/techo_casa.png")
        let material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x333333,
            shininess: 15,
          })
        var objeto = new THREE.Mesh(geometry, material)
        objeto.position.x = position[0];
        objeto.position.y = position[1];

        scene.add(objeto);


	}
}