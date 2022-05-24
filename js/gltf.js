AFRAME.registerComponent('disable-culling', {
    init: function(){
        this.el.addEventListener('model-loaded', function(event){
            event.detail.model.traverse(function(child){
                if (child.isMesh){
                    console.log("disable culling")
                    child.frustumCulled = false;
                    child.material.side = THREE.DoubleSide;
                }
            });
        });
    }
  })


  AFRAME.registerComponent('limited-camera', {

    init: function () {
        // get camera
         this.camera = document.querySelector('#camera');
        // // get camera position
         this.cameraPosition = this.camera.getAttribute('position');
        // // get camera rotation
         this.cameraRotation = this.camera.getAttribute('rotation');
  },
  tick: function () {
        // get camera position
        this.cameraPosition = this.camera.getAttribute('position');
        // get camera rotation
        this.cameraRotation = this.camera.getAttribute('rotation');
        // Camera cant lookt at the sky
        if(this.cameraRotation.x > 3.5){
            console.log("camera rotation x < -3.5")
            this.camera.setAttribute('rotation', {x: 3.5, y: this.cameraRotation.y, z: this.cameraRotation.z});
        }

        // Camera cant go outside the house
        if(this.cameraPosition.z < -2 ){
            console.log("camera position z > -2")
            this.camera.setAttribute('position', {x: this.cameraPosition.x, y: this.cameraPosition.y, z: -2});
        }
        if(this.cameraPosition.z > 7){
            console.log("camera position z < 7")
            this.camera.setAttribute('position', {x: this.cameraPosition.x, y: this.cameraPosition.y, z: 7});
        }
        if(this.cameraPosition.x > 4){
            console.log("camera position x < 4")
            this.camera.setAttribute('position', {x: 4, y: this.cameraPosition.y, z: this.cameraPosition.z});
        }
        if(this.cameraPosition.x < -9){
            console.log("camera position x > -9")
            this.camera.setAttribute('position', {x: -9, y: this.cameraPosition.y, z: this.cameraPosition.z});
        }
 
  }  

})