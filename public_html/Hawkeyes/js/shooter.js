
class shooter {

    constructor(camera, scene) {

        var mat = Physijs.createMaterial(new THREE.MeshPhongMaterial ({color: 0x000000}), 1, 0);
        this.shooter = new THREE.Mesh (new THREE.BoxGeometry (5, 5, 5), mat);
        this.shooter.material.transparent = true;
        this.shooter.material.opacity = 0.0;
        this.shooter.position.y = 2.5;
        this.shooter.__dirtyPosition = true;
        scene.add(this.shooter);
        this.camera = camera;
        this.controls = controls;
        this.activeWeapon = null;
        this.goingUp = true;
        this.recoil = true;
        this.posLimit = 500;
        this.shotgun = null;
        this.rifle = null;

        this.shooter.add(this.camera);
    }

    getPosition() {
        var pos = new THREE.Vector3();
        pos.x = this.shooter.position.x;
        pos.y = this.shooter.position.y;
        pos.z = this.shooter.position.z;
        return pos;
    }

    setInitialPosition() {
        this.shooter.position.set(0, 2.5, 0);
    }

    getActiveWeapon() {
        return this.activeWeapon;
    }

    jump() {
        if (this.goingUp) {
            if (this.shooter.position.y > 15) this.goingUp = false;
            else this.shooter.position.y += 0.5;
        } else {
            if (this.shooter.position.y >= 2 && this.shooter.position.y <= 2.5) {
                jumping = false;
                this.goingUp = true;
            } else this.shooter.position.y -= 0.5;
        }
    }

    updateControls() {
        controls.getObject().position.set(this.shooter.position.x, this.shooter.position.y+5, this.shooter.position.z);
    }

    moveForward() {
        var target = this.camera.getWorldDirection();
        var nextPosition = target.x + this.shooter.position.x;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateX( target.x );
        nextPosition = target.z + this.shooter.position.z;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateZ( target.z );
    }

    moveBackward() {
        var target = this.camera.getWorldDirection();
        var nextPosition = -target.x + this.shooter.position.x;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateX( -target.x );
        nextPosition = -target.z + this.shooter.position.z;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateZ( -target.z );
    }

    moveLeft() {
        var target = this.camera.getWorldDirection();
        var nextPosition = target.z + this.shooter.position.x;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateX( target.z );
        nextPosition = -target.x + this.shooter.position.z;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateZ( -target.x );
    }

    moveRight() {
        var target = this.camera.getWorldDirection();
        var nextPosition = -target.z + this.shooter.position.x;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateX( -target.z );
        nextPosition = target.x + this.shooter.position.z;
        if(nextPosition <= this.posLimit && nextPosition >= -this.posLimit)
            this.shooter.translateZ( target.x );
    }

    changeWeapon() {
        if (this.activeWeapon == 0) {
            this.rifle.material.transparent = true;
            this.rifle.material.opacity = 0.0;
            this.shotgun.material.transparent = false;
            this.shotgun.material.opacity = 1.0;
            this.activeWeapon = 1;
        } else if (this.activeWeapon == 1) {
            this.shotgun.material.transparent = true;
            this.shotgun.material.opacity = 0.0;
            this.rifle.material.transparent = false;
            this.rifle.material.opacity = 1.0;
            this.activeWeapon = 0;
        }
    }

    animateWeapon() {
        if (this.activeWeapon == 0) {
            if (this.recoil) {
                if (this.rifle.rotation.x >= 0.2) this.recoil = false;
                else this.rifle.rotation.x += 0.1;
            } else {
                if (this.rifle.rotation.x >= 0 && this.rifle.rotation.x <= 0.1) {
                    disappear = false;
                    this.recoil = true;
                } else this.rifle.rotation.x -= 0.1;
            }
        } else if (this.activeWeapon == 1) {
            if (this.recoil) {
                if (this.shotgun.rotation.x >= 1.8) this.recoil = false;
                else this.shotgun.rotation.x += 0.1;
            } else {
                if (this.shotgun.rotation.x >= 0 && this.shotgun.rotation.x <= 0.1) {
                    disappear = false;
                    this.recoil = true;
                } else this.shotgun.rotation.x -= 0.1;
            }
        }
    }

    loadWeapons() {
        var thatCamera = this.camera;
        var that = this;

        var mtlLoader = new THREE.MTLLoader();
        var objLoader = new THREE.OBJLoader();
        var texture = null;

        mtlLoader.setPath( "models/" );
        mtlLoader.load( "material.mtl" , function ( materials ) {
            materials.preload();
            
            objLoader.setMaterials( materials );
            objLoader.setPath( "models/" );
            objLoader.load( "m4a1_s.obj", function ( object ) {
                texture = THREE.ImageUtils.loadTexture('models/m4a1_stext.png');
                object.children[1].material = new THREE.MeshLambertMaterial({map: texture});
                //m4a1_s
                object.children[1].position.set(0, 0, 0);
                object.children[1].scale.set(0.2, 0.2, 0.2);
                object.children[1].rotation.set(0.1, 3.4, 0);
                object.children[1].position.set(2, -0.8, -2);
                that.rifle = object.children[1];
                thatCamera.add(that.rifle);
                that.activeWeapon = 0;

            });
        });

        mtlLoader.setPath( "models/" );
        mtlLoader.load( "material.mtl" , function ( materials ) {
            materials.preload();

            objLoader.setMaterials( materials );
            objLoader.setPath( "models/" );
            objLoader.load( "escopeta.obj", function ( object ) {
                texture = THREE.ImageUtils.loadTexture('models/escopetatext.png');
                object.children[0].material = new THREE.MeshLambertMaterial({map: texture});
                
                //Escopeta
                object.children[0].position.set(0, 0, 0);
                object.children[0].scale.set(0.4, 0.4, 0.4);
                object.children[0].rotation.set(0.2, -1.2, 0);
                object.children[0].position.set(2, -1.4 , -6);
                object.children[0].material.transparent = true;
                object.children[0].material.opacity = 0.0;
                that.shotgun = object.children[0];
                thatCamera.add(that.shotgun);

            });
        });

    }
}