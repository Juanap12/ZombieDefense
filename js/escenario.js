
/**
	WIDTH - ancho de la matriz
	HEIGH - alto de la matriz

	sceneObjs - lista de objetos, con atributos height (alto), width (ancho), frequency (frecuencia), id
**/

var EMPTY  = 0;
var STREET = 1;

function generarMatrizEscenario(WIDTH,HEIGHT,sceneObjs) {

	


    var m = []
    for (var i = 0; i < HEIGHT; i ++) {
      m[i] = []
      for (var j = 0; j < WIDTH; j ++ ) 
        m[i].push(EMPTY);
    }

    // MAIN STREET
    /*for (var i = 0; i < HEIGHT; i++) {
      m[i][Math.floor(WIDTH/2)] = STREET;
    }*/
    for (var i = 0; i < WIDTH; i++) {
        m[Math.floor(HEIGHT/2)][i] = STREET;
    }

    // LEFT STREETS
    var STREETS_PER_SIDE = 2;
    for (var i = 0; i < WIDTH; i++) {
      var build = ( (Math.random()*WIDTH)<STREETS_PER_SIDE );
      if (build) {
        for (var j = 0; m[j][i] != 1; j++) {
          m[j][i] = STREET;
        }
        i++;
      }
    }


    // RIGHT STREETS
    for (var i = 0; i < WIDTH; i++) {
      var build = ( (Math.random()*WIDTH)<STREETS_PER_SIDE );
      if (build) {
        for (var j = HEIGHT - 1; m[j][i] != 1; j--) {
          m[j][i] = STREET;
        }
        i++;
      }
    }


    function checkEmptySpots(m,w,h) {
    	let empty_spots = [];
    	for (var i =0; i < HEIGHT; i ++) {
    		for (var j = 0; j < WIDTH; j ++) {
    			if (m[i][j] == EMPTY) {
    				let empty = true;
    				for (let k = 0; k < w*h; k++) { 
    					var l = Math.floor(k/w) + i;
    					var f = k%w + j;
    					if (f >= WIDTH || l >= HEIGHT || m[l][f] != EMPTY) {
    						empty = false
    						break;
    					}
    				}
    				if (empty) {
    					empty_spots.push( [i,j] );
    				}
    			}
    		}
    	}
    	return empty_spots;
    }

    // SCENE OBJECTS
    for (let obj of sceneObjs) obj._count = obj.frequency;
    let N = sceneObjs.reduce((a,b) => a._count + b._count,{_count:0});
    
    let sobjs = sceneObjs.slice(0);

    for (let iter = 0; iter < N; iter++ ) {
    	var index = Math.floor(Math.random()*sobjs.length)
    	var obj = sobjs[index];

    	var empty_spots = checkEmptySpots(m,obj.width,obj.height);
    	
    	var index = Math.floor(Math.random()*empty_spots.length);
    	var position = empty_spots[index];

    	for (let k = 0; k < obj.width*obj.height; k++) { 
    		var i = Math.floor(k/obj.width) + position[0];
    		var j = k%obj.width + position[1];
    		m[i][j] = obj.id;
    	}
    }

    return m;
}

function imprimirMatriz() {
    for (var i = 0; i < m.length; i ++) console.log(m[i]);
}

var street_texture = (new THREE.TextureLoader()).load('/textures/street.png');

function crearEscenario() {

    var WIDTH = 31;
    var HEIGHT = 15;

    var matrix = generarMatrizEscenario(WIDTH,HEIGHT,[{
            'width': 3,
            'height' : 2,
            'frequency' : 3,
            'id' : 3,
        }]);
    var x0 = -Math.floor(WIDTH/2);
    var y0 = -Math.floor(HEIGHT/2);

    for (var j = 0; j < HEIGHT; j++)
    for (var i = 0; i < WIDTH; i ++) {
        var geometry = new THREE.PlaneGeometry( 1, 1 );
        var material;
        var plane;
        switch (matrix[j][i]) {
            case STREET:
                material = new THREE.MeshBasicMaterial( {map: street_texture, side: THREE.DoubleSide} );
                plane = new THREE.Mesh( geometry, material );
                if (j != Math.floor(HEIGHT/2)) plane.rotation.z += Math.PI/2;
                plane.position.x = i + x0;
                plane.position.y = j + y0;
                scene.add( plane );
                break;
            case EMPTY:
                material = new THREE.MeshBasicMaterial( {color:0x00ff00, side: THREE.DoubleSide} );
                plane = new THREE.Mesh( geometry, material );
                plane.position.x = i + x0;
                plane.position.y = j + y0;
                scene.add( plane );
                break
            default:
                //material = new THREE.MeshBasicMaterial( {color:  0xff0000, side: THREE.DoubleSide} );
                //plane = new THREE.Mesh( geometry, material );
                new Edificio(i + x0, j + y0)
        }
    }
}

