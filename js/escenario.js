
/**
	WIDTH - ancho de la matriz
	HEIGH - alto de la matriz

	sceneObjs - lista de objetos, con atributos height (alto), width (ancho), frequency (frecuencia), id
**/
function generarMatrizEscenario(WIDTH,HEIGHT,sceneObjs) {

	var EMPTY  = 0;
	var STREET = 1;


    var m = []
    for (var i = 0; i < HEIGHT; i ++) {
      m[i] = []
      for (var j = 0; j < WIDTH; j ++ ) 
        m[i].push(EMPTY);
    }

    // MAIN STREET
    for (var i = 0; i < HEIGHT; i++) {
      m[i][Math.floor(WIDTH/2)] = STREET;
    }

    // LEFT STREETS
    var STREETS_PER_SIDE = 2;
    for (var i = 0; i < HEIGHT; i++) {
      var build = ( (Math.random()*HEIGHT)<STREETS_PER_SIDE );
      if (build) {
        for (var j = 0; m[i][j] != 1; j++) {
          m[i][j] = STREET;
        }
      }
    }

    // RIGHT STREETS
    for (var i = 0; i < HEIGHT; i++) {
      var build = ( (Math.random()*HEIGHT)<STREETS_PER_SIDE );
      if (build) {
        for (var j = WIDTH - 1; m[i][j] != 1; j--) {
          m[i][j] = STREET;
        }
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