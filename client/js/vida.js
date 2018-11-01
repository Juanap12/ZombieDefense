
class Vida {
	constructor(x,y,w,h) {

		let geometry = new THREE.BoxGeometry(width, height, depth)
        //let texture = loader.load("client/textures/techo_edificio.png")
        let material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x333333,
            shininess: 15,
          })
	}

}