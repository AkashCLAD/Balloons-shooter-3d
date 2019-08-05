
class Balloons {

  constructor (scene, level) {

    this.balloons = [];
    this.countCollitions = [];
    this.direction = [];
    this.force = 0;
    this.init = true;
    this.countDead = 0;

    this.scene = scene;

    if(level == 1)
      this.force = 5;
    else if (level == 2)
      this.force = 10;
    else if (level == 3)
      this.force = 20;
    else
      this.force = 30;

    var loader = new THREE.TextureLoader();
    var diana = loader.load ("imgs/diana.png");

    this.mat1 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat2 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat3 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat4 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat5 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat6 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat7 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat8 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat9 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
    this.mat10 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: diana}), -100, 0);
  
    var obj1 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat1, 1);
    obj1.applyMatrix (new THREE.Matrix4().makeTranslation (100, 7, -150));
    obj1.receiveShadow = true;
    obj1.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("left");
    this.balloons.push(obj1);
    this.scene.add(obj1);
    this.addBulletListener(this.balloons.length - 1);

   var obj2 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat2, 1);
    obj2.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 7, -250));
    obj2.receiveShadow = true;
    obj2.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("right");
    this.balloons.push(obj2);
    this.scene.add(obj2);
    this.addBulletListener(this.balloons.length - 1);
  

    var obj3 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat3, 1);
    obj3.applyMatrix (new THREE.Matrix4().makeTranslation (100, 7, -350));
    obj3.receiveShadow = true;
    obj3.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("left");
    this.balloons.push(obj3);
    this.scene.add(obj3);
    this.addBulletListener(this.balloons.length - 1);
  
    var obj4 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat4, 1);
    obj4.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 7, -450));
    obj4.receiveShadow = true;
    obj4.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("right");
    this.balloons.push(obj4);
    this.scene.add(obj4);
    this.addBulletListener(this.balloons.length - 1);

    var obj5 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat5, 1);
    obj5.applyMatrix (new THREE.Matrix4().makeTranslation (-150, 7, -400));
    obj5.receiveShadow = true;
    obj5.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("right");
    this.balloons.push(obj5);
    this.scene.add(obj5);
    this.addBulletListener(this.balloons.length - 1);
    
    var obj6 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat6, 1);
    obj6.applyMatrix (new THREE.Matrix4().makeTranslation (100, 7, -110));
    obj6.receiveShadow = true;
    obj6.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("left");
    this.balloons.push(obj6);
    this.scene.add(obj6);
    this.addBulletListener(this.balloons.length - 1);

    var obj7 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat7, 1);
    obj7.applyMatrix (new THREE.Matrix4().makeTranslation (-200, 7, -300));
    obj7.receiveShadow = true;
    obj7.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("right");
    this.balloons.push(obj7);
    this.scene.add(obj7);
    this.addBulletListener(this.balloons.length - 1);

    var obj8 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat8, 1);
    obj8.applyMatrix (new THREE.Matrix4().makeTranslation (150, 7, -235));
    obj8.receiveShadow = true;
    obj8.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("left");
    this.balloons.push(obj8);
    this.scene.add(obj8);
    this.addBulletListener(this.balloons.length - 1);

    var obj9 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat9, 1);
    obj9.applyMatrix (new THREE.Matrix4().makeTranslation (-130, 7, -275));
    obj9.receiveShadow = true;
    obj9.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("right");
    this.balloons.push(obj9);
    this.scene.add(obj9);
    this.addBulletListener(this.balloons.length - 1);

    var obj10 = new Physijs.BoxMesh (new THREE.SphereGeometry (5, 32, 32), this.mat10, 1);
    obj10.applyMatrix (new THREE.Matrix4().makeTranslation (180, 7, -135));
    obj10.receiveShadow = true;
    obj10.autoUpdateMatrix = false;
    this.countCollitions.push(0);
    this.direction.push("left");
    this.balloons.push(obj10);
    this.scene.add(obj10);
    this.addBulletListener(this.balloons.length - 1);


    return this;
  }

  addBulletListener(i) {
    var that = this;
    this.balloons[i].addEventListener ( 'collision' , function () {
      if (that.countCollitions[i] == 1) {
        var sound = new Howl({
          src: ['sounds/balloonPop.mp3'], volume: 2
        });
        sound.play();
        scene.updateScore(10);
        
        that.countDead++;
        if(that.countDead == 6){
          scene.level++;
          scene.newLevel();
        }
      }
      that.countCollitions[i]++;
    });
  }

  getBalloons(i) {
    return this.balloons[i];
  }

  getBalloonsSize() {
    return this.balloons.length;
  }

  animate() {
    for (var i = 0; i < this.balloons.length; ++i) {
      if (this.balloons[i].position.x >= 100 && this.direction[i] == "left") {
        this.balloons[i].applyCentralImpulse(new THREE.Vector3(-this.force,this.force,0));
        this.direction[i] = "right";
      }
      else if (this.balloons[i].position.x <= -100 && this.direction[i] == "right") { 
        this.balloons[i].applyCentralImpulse(new THREE.Vector3(this.force,this.force,0));
        this.direction[i] = "left";
      }
    }
    if(this.init) {
      this.force*=0.1;
      this.init = false;
    }

    //Force next level in case it didn't detect a collision
    /*if (this.balloons[0].position.z != -150 && this.balloons[1].position.z != -250 && 
      this.balloons[2].position.z != -350 && this.balloons[3].position.z != -450) {
      scene.level++;
      scene.newLevel();
    }*/
  }

}
