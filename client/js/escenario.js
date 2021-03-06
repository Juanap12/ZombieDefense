
/**
	WIDTH - ancho de la matriz
	HEIGH - alto de la matriz

	sceneObjs - lista de objetos, con atributos height (alto), width (ancho), frequency (frecuencia), id
**/

var EMPTY  = 0;
var GRASS  = 1
var STREET = 2;
var HOUSE  = 3;
var BUILDING = 4;
var PLAYER = 5;

var street_texture = (new THREE.TextureLoader()).load('client/textures/street2.jpg');
var grass_texture = (new THREE.TextureLoader()).load('client/textures/grass.jpg');

function generarMatrizEscenario(WIDTH,HEIGHT,sceneObjs) {
	


    var m = []
    for (var i = 0; i < HEIGHT; i ++) {
      m[i] = []
      for (var j = 0; j < WIDTH; j ++ ) 
        m[i].push(EMPTY);
    }

    let midRow = Math.floor(HEIGHT/2);
    
    
    // Player 1
    m[midRow + 1][0] = 5;
    m[midRow + 2][0] = 5;
    m[midRow + 1][1] = 5;
    m[midRow + 2][1] = 5;

    // Player 2
    m[midRow - 1][0] = 5;
    m[midRow - 2][0] = 5;
    m[midRow - 1][1] = 5;
    m[midRow - 2][1] = 5;
    

    // MAIN STREET
    for (var i = 0; i < WIDTH; i++) {
        m[Math.floor(HEIGHT/2)][i] = STREET;
    }


    // UPPER STREETS
    var STREETS_PER_SIDE = 2;
    for (var i = 4; i < (WIDTH - 2); i++) {
      var build = ( (Math.random()*WIDTH)<STREETS_PER_SIDE );
      if (build) {
        for (var j = 0; m[j][i] != STREET; j++) {
          m[j][i] = STREET;
        }
        i++;
      }
    }

    // LOW STREETS
    for (var i = 4; i < (WIDTH - 2); i++) {
      var build = ( (Math.random()*WIDTH)<STREETS_PER_SIDE );
      if (build) {
        for (var j = HEIGHT - 1; m[j][i] != STREET; j--) {
          m[j][i] = STREET;
        }
        i++;
      }
    }


    function checkEmptySpots(matrix,objectWidth,objectHeight) {
    	let empty_spots = [];
    	for (var i = 0; i < HEIGHT; i ++) {
    		for (var j = 0; j < WIDTH; j ++) {
    			if (matrix[i][j] == EMPTY) {
    				let empty = true;
    				for (let k = 0; k < objectWidth*objectHeight; k++) { 
    					var fila = Math.floor(k/objectWidth) + i;
    					var columna = k%objectWidth + j;
    					if (columna >= WIDTH || fila >= HEIGHT || matrix[fila][columna] != EMPTY ) {
                            empty = false
                            break
                        }
    				}
    				if (empty) {
                        empty_spots.push( [i + 1,j + 1
                        ] );
    				}
    			}
    		}
    	}
    	return empty_spots;
    }

    // SCENE OBJECTS
    for (let obj of sceneObjs) obj._count = obj.frequency;
    let N = sceneObjs.reduce((a,b) => a._count + b._count);
    let sobjs = sceneObjs.slice(0);

    for (let iter = 0; iter < N; iter++ ) {
    	var index = Math.floor(Math.random()*sobjs.length)

    	var obj = sobjs[index];
        while (obj._count == 0) obj = sobjs[(index + 1)%sobjs.length];
        obj._count -= 1;


    	var empty_spots = checkEmptySpots(m,obj.width + 2,obj.height + 2);
    	
    	var index = Math.floor(Math.random()*empty_spots.length);
    	var position = empty_spots[index];
        console.log(position)

    	for (let k = 0; k < obj.width*obj.height; k++) { 
    		var i = Math.floor(k/obj.width) + position[0];
    		var j = k%obj.width + position[1];
    		m[i][j] = obj.id;
    	}
    }

    // Fill empty with grass
    for (var i = 0; i < HEIGHT; i ++) {
      for (var j = 0; j < WIDTH; j ++ ) 
        if (m[i][j] == EMPTY) m[i][j] = GRASS;
    }    

    return m;
}

function imprimirMatriz(m) {
    for (var i = 0; i < m.length; i ++){
        console.log(m[i]);
    }
}

function copiarMatriz(m) {
    var cm = [];
    for (var j = 0; j < m.length; j++) {
        cm.push([]);
        for (var i = 0; i < m[j].length; i++) {
            cm[j].push(m[j][i]);
        }
    }
    return cm;
}

var WIDTH = 21;
var HEIGHT = 13;
function crearEscenario() {

   

    var objects = [
        {
            'width': 1,
            'height' : 1,
            'frequency' : 6,
            'id' : HOUSE,
        },{
            'width': 3,
            'height' : 2,
            'frequency' : 3,
            'id' : BUILDING,
        }
    ];

    var objects_ids = [HOUSE,BUILDING,PLAYER];
    var constructors =[Casa ,Edificio, Jugador];

    var objects_constructor = {};
    for (var i = 0; i < objects_ids.length; i++)
        objects_constructor[objects_ids[i]] = constructors[i];

    var matrix = generarMatrizEscenario(WIDTH,HEIGHT,objects);
    var cpy_matrix = copiarMatriz(matrix);

    var x0 = -Math.floor(WIDTH/2);
    var y0 = -Math.floor(HEIGHT/2);

    imprimirMatriz(matrix)

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
            case GRASS:
                material = new THREE.MeshBasicMaterial( {map: grass_texture, side: THREE.DoubleSide} );
                plane = new THREE.Mesh( geometry, material );
                plane.position.x = i + x0;
                plane.position.y = j + y0;
                scene.add( plane );
                break
            case EMPTY:
                break;
            default:
                var constructor = objects_constructor[matrix[j][i]];
                //console.log(constructor);
                //console.log(`i: ${i} j: ${j}`)
                var obj = new constructor(i + x0 - 0.5, j + y0 - 0.5);

                if(matrix[j][i] == PLAYER){
                    jugadores.push(obj)
                    material = new THREE.MeshBasicMaterial( {map: grass_texture, side: THREE.DoubleSide} );
                
                    plane = new THREE.Mesh( geometry, material );
                    plane.position.x = i + x0;
                    plane.position.y = j + y0;
                    scene.add( plane );

                }

                var w = obj.width;
                var h = obj.height;
                for (let k = 0; k < w*h; k++) { 
                    var j_ = Math.floor(k/w) + j;
                    var i_ = k%w + i;
                    matrix[j_][i_] = GRASS;
                }
        }
    }

    imprimirMatriz(matrix)

    return cpy_matrix
}

