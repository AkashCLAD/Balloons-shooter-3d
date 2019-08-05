
class Skybox extends THREE.Object3D {

  constructor () {
    super();

    this.lenghtxz = 10000;
    this.heighty = 10000;

    this.skybox = null;

    var geometry = new THREE.BoxGeometry( this.lenghtxz, this.heighty, this.lenghtxz );

    var loader = new THREE.TextureLoader();

    var material = [];
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/ft.JPG"), side: THREE.BackSide } ) );
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/bk.JPG"), side: THREE.BackSide } ) );
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/up.JPG"), side: THREE.BackSide } ) );
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/dn.JPG"), side: THREE.BackSide } ) );
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/rt.JPG"), side: THREE.BackSide } ) );
    material.push( new THREE.MeshBasicMaterial( { map: loader.load("imgs/mybox/lf.JPG"), side: THREE.BackSide } ) );

    this.skybox = new THREE.Mesh( geometry, material );
    
    
    this.skybox.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 0));

    this.add(this.skybox);
  }

}
