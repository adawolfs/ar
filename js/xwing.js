let score = 0

window.onload = function() {
    console.log("load")
    var backgroundSound = new Audio('assets/sounds/space-atmosfera.mp3');
    backgroundSound.play();
    backgroundSound.loop = true;
}

AFRAME.registerComponent('asteroid-game',{
    init: function(){
    },
    tick: (function(){
        var _lastTime = 0;
        return function(time, delta){
            let scoreText = document.querySelector('#score')
            let aframe = document.querySelector('#aframe-scene')
            // <a-entity id="asteroid0" gltf-model="#asteroid" asteroid 
            // target="healthPoints: 1" hit-handler
            // position="-10 1 -20" scale="0.5 0.5 0.5" rotation="0 0 0"
            // physics="mass: 1; shape: box; friction: 0.5; restitution: 0.5;"></a-entity>

            let _asteroid = document.createElement('a-entity')
            _asteroid.setAttribute('id', time)
            _asteroid.setAttribute('asteroid','')
            _asteroid.setAttribute('target','healthPoints: 1')
            _asteroid.setAttribute('hit-handler','')
            _asteroid.setAttribute('gltf-model','#asteroid')
            // _asteroid.setAttribute('instanced-mesh-member', "mesh:#asteroid_mesh")
            _asteroid.setAttribute('position',`${(Math.random() * 20) - 10} ${(Math.random() * 20) - 10} -30`)

            _asteroid.scale='0.5 0.5 0.5'
            
            if(time - _lastTime > 2000){
                // aframe.appendChild(_asteroid)
                _lastTime = time
            }

            // scoreText.setAttribute('text','value', Math.round(time)/1000);
        }
    })()
})
AFRAME.registerComponent('asteroid',{
    init: function(){
    
    },
    tick: function(time, delta){
        let _rotation = this.el.getAttribute('rotation')
        
        this.el.setAttribute('rotation', {x: _rotation.x  , y: _rotation.y , z: _rotation.z + 0.1});
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
        let _audio = new Audio('assets/sounds/laser-1.wav');
        _audio.volume = 0.2;
        let _busy = false;
        document.body.addEventListener('mousedown', () => {
            _audio.load()
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
            // _busy = true;
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
        
        console.log(`setup hit handler ${el}`)
        el.addEventListener('hit', () => {
            var scoreText = document.getElementById('score');
            console.log(scoreText)
            scoreText.setAttribute('text', 'value', `Score: ${score++}`);
            // scoreText.setAttribute('text','value', parseInt(scoreText.getAttribute('text')['value']) + 1);
        });

        el.addEventListener('die', () => {
            el.setAttribute('position',`${(Math.random() * 20) - 20} ${(Math.random() * 20) - 20} -80`)
            
        });
    },

    tick: (function () {
        return function (time, delta) {
            if (this.el.object3D.visible) {
                let position = this.el.getAttribute('position');
                this.el.setAttribute('position', {x: position.x, y: position.y, z: position.z + 0.05});
            }
        // position.z = position.z + 0.008;
        };
    })()
});