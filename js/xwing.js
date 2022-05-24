AFRAME.registerComponent('asteroid',{
    init: function(){
    
    },
    tick: function(){
    //    this.el.setAttribute('rotation', {x: 0 , y: 0, z:  this.el.getAttribute('rotation').z + 1 });
    }
})
AFRAME.registerComponent('emissive-material', {
    schema: {
        color: {type: 'color', default: '#FFF'}
    },
    init: function () {
        var data = this.data;
        var el = this.el;
        var material = el.getAttribute('material');
        material.emissive = data.color;
        material.emissiveIntensity = 1;
        el.setAttribute('material', material);
    }
})

AFRAME.registerComponent('click-to-shoot', {
    init: function () {
        let _audio = new Audio('sounds/laser.wav');
        let _busy = false;
        document.body.addEventListener('mousedown', () => {
            _audio.play();    
            if (!_busy) {
                this.el.emit('shoot');
            }
        });

        this.el.addEventListener('shoot', () => {
            // let player = document.getElementsByClassName('player')[0];
            if (_busy) {
                return;
            }
            _busy = true;
            setTimeout(() => {
                // player.setAttribute('animation-mixer', 'clip: Fusil_IDLE')
                _busy = false;
            }, 500);


            // player.setAttribute('animation-mixer', 'clip: Fusil_FIRE')
        });

    }
});

/**
 * Change color when hit.
 */
AFRAME.registerComponent('hit-handler', {
    dependencies: ['material'],

    init: function () {
        var color;
        var el = this.el;
        color = new THREE.Color();
        el.addEventListener('hit', () => {
            color.addScalar(0.05);
            el.components.material.material.color.copy(color);
        });

        el.addEventListener('die', () => {
            color.setRGB(1, 0, 0);
            el.object3D.visible = false;
        });
    },

    tick: function () {
        let el = this.el;
        let position = el.getAttribute('position');
        position.z = position.z + 0.008;
    }
});