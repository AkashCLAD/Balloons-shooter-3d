var gameover = "||||||||Game Over||||||||";
var finalscore;
class TheScene extends Physijs.Scene {

  constructor(renderer, aCamera) {

    super();
    this.setGravity(new THREE.Vector3(0, 0, 0));

    this.camera = aCamera;
    this.createCrosshair(renderer);

    this.shooter = null;
    this.map = null;
    this.balloons = null;
    this.skybox = null;
    this.Bullets = null;
    this.index = 0;
    this.maxBullets = 20;
    this.actualAmmo = 200;
    this.score = 0;
    this.time = 120;
    this.lastScore = 0;
    this.level = 1;

    this.createHUD();

    this.createshooter();
    this.shooter.loadWeapons();
    this.place = this.createPlace();
    this.createBullets();
    this.createBalloons(this.level);


    this.ambientLight = null;
    this.spotLight = null;
    this.createLights();

    this.add(this.place);
  }


  /** timer(){
    var time = document.createElement('div');
    time.id = "time";
    time.style.position = 'absolute';
    time.style.width = 1;
    time.style.height = 1;
    time.style.top = 125 + 'px';
    time.style.left = 50 + 'px';
    time.style.fontSize = 25 + 'px';
    time.style.color = "white";
    
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
      document.getElementById("time").innerHTML ="Time :"+timeleft + " seconds ";
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("time").innerHTML =alert("game over");
      }
    }, 1000);
    document.body.appendChild(time);
  }*/

  createHUD() {
    var score = document.createElement('div');
    score.id = "score";
    score.style.position = 'absolute';
    score.style.width = 1;
    score.style.height = 1;
    score.innerHTML = "Score: " + this.score;
    score.style.top = 50 + 'px';
    score.style.left = 50 + 'px';
    score.style.fontSize = 25 + 'px';
    score.style.color = "white";
    document.body.appendChild(score);

    var ammo = document.createElement('div');
    ammo.id = "ammo";
    ammo.style.position = 'absolute';
    ammo.style.width = 1;
    ammo.style.height = 1;
    ammo.innerHTML = "Ammunation: " + this.actualAmmo;
    ammo.style.top = 75 + 'px';
    ammo.style.left = 50 + 'px';
    ammo.style.fontSize = 25 + 'px';
    ammo.style.color = "white";
    document.body.appendChild(ammo);

    var level = document.createElement('div');
    level.id = "level";
    level.style.position = 'absolute';
    level.style.width = 1;
    level.style.height = 1;
    level.innerHTML = "Level: " + this.level;
    level.style.top = 100 + 'px';
    level.style.left = 50 + 'px';
    level.style.fontSize = 25 + 'px';
    level.style.color = "white";
    document.body.appendChild(level);



    var time = document.createElement('div');
    time.id = "time";
    time.style.position = 'absolute';
    time.style.width = 1;
    time.style.height = 1;
    time.innerHTML = "" + this.timer();
    time.style.top = 125 + 'px';
    time.style.left = 50 + 'px';
    time.style.fontSize = 25 + 'px';
    time.style.color = "white";
    document.body.appendChild(time);







  }

  timer() {

    if (this.time == 120) {
      $(window).load(function () {
        this.time = 120;
        var timer = setInterval(function () {
          if(blocker.style.display == 'none'){
          time--;
          }
          if (time === 0) {
            clearInterval(timer);
            alert(gameover + "" + "\n" + "Score :" + finalscore + "\n" + "Press...OK to restart game");
            window.location = '../../index.html';
          }
          $('#time').text("Games End In :" + time + " sec");
        }, 1000);

      });
    }
    else {
      alert("error");
    }

  }

  updateAmmo() {
    var text = document.getElementById("ammo");
    text.innerHTML = "Ammunition: " + this.actualAmmo;
  }

  updateScore(newScore) {
    var text = document.getElementById("score");
    this.score += newScore;
    finalscore = this.score;

    text.innerHTML = "Score: " + this.score;
  }

  updateLevel() {
    var level = document.getElementById("level");
    level.innerHTML = "Level: " + this.level;
  }

  createCrosshair(renderer) {
    // Create the Crosshair
    var crosshair = new Crosshair();
    this.camera.add(crosshair);

    // Place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    crosshair.position.set((crosshairPercentX / 100) * 2 - 1, (crosshairPercentY / 100) * 2 - 1, -0.3);
  }

  disappear() {
    if (this.index >= this.maxBullets) {
      this.index = 0;
      this.bullets.reload();
    }
    if (!disappear) {
      this.bullets.disappear(this.index, this.shooter.getPosition(), this.camera.getWorldDirection(), this.shooter.getActiveWeapon());
      this.index++;
      this.actualAmmo--;
      this.updateAmmo();
    }
  }

  /// It creates lights and adds them to the graph
  createLights() {
    // add ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add(this.ambientLight);

    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 500, 1000);
    this.spotLight.intensity = 1;
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.add(this.spotLight);
  }

  createPlace() {
    var place = new THREE.Object3D();

    this.skybox = new Skybox();
    place.add(this.skybox);

    //Creates the map
    this.map = new Map();
    for (var i = 0; i < this.map.getMapSize(); ++i) {
      this.add(this.map.getMap(i));
    }

    return place;
  }

  createshooter() {
    this.shooter = new shooter(this.camera, this);
  }

  createBullets() {
    var loader = new THREE.TextureLoader();
    var textura = loader.load("imgs/bullettext.jpg");
    this.bullets = new Bullets(this.maxBullets, this, (new THREE.MeshPhongMaterial({ map: textura })));
  }

  createBalloons() {
    this.balloons = new Balloons(this, this.level);
  }

  endGame() {
    enableControls = false;
    controls.enabled = false;

    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    jumping = false;
    this.updateScore = false;
    this.updateAmmo = false;
    this.updateLevel = false;
    this.balloons = false;

    blocker.style.display = 'block';
    instructions.style.display = '';
    instructions.style.fontSize = "50px";

    instructions.innerHTML = "TotalScore : " + this.score;
  }

  /// 
  /**
   * @controls - The GUI information
   */
  animate() {
    this.simulate();

    if (moveForward) this.shooter.moveForward();
    if (moveBackward) this.shooter.moveBackward();
    if (moveLeft) this.shooter.moveLeft();
    if (moveRight) this.shooter.moveRight();

    if (jumping) {
      this.shooter.jump();
    }

    if (disappear) {
      this.shooter.animateWeapon();
    }

    this.shooter.updateControls();

    this.balloons.animate();

    if (this.actualAmmo == 0) {
      this.endGame();
    }
  }

  changeWeapon() {
    this.shooter.changeWeapon();
  }

  getCamera() {
    return this.camera;
  }

  getCameraControls() {
    return this.controls;
  }

  setCameraAspect(anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }

  newLevel() {
    //this.shooter.setInitialPosition();

    if (this.score - this.lastScore != 60)
      this.score = this.lastScore + 60;

    this.updateLevel();

    for (var i = 0; i < this.balloons.getBalloonsSize(); ++i) {
      this.remove(this.balloons.getBalloons(i));
    }
    this.createBalloons();
    this.lastScore = this.score;
  }




  newGame() {
    blocker.style.display = 'none';
    this.timer();
    enableControls = true;
    controls.enabled = true;
    this.shooter.setInitialPosition();
    this.actualAmmo = 200;
    this.updateAmmo();
    this.score = 0;
    this.updateScore(0);
    this.level = 1;

    this.updateLevel();

    for (var i = 0; i < this.balloons.getBalloonsSize(); ++i) {
      this.remove(this.balloons.getBalloons(i));
    }
    this.createBalloons();
  }
}


