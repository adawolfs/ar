import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import { RoughnessMipmapper } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/utils/RoughnessMipmapper.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/DeviceOrientationControls.js';
import { FlyControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/FlyControls.js';

let camera, scene, renderer, controls, clock, mixer;

let reflector;

let count = 0, material

init_city_banner();

function init_city_banner() {

    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    const FRUSTUM_SIDE = 20;
// camera = new THREE.OrthographicCamera(
//    -FRUSTUM_SIDE/2, FRUSTUM_SIDE/2, 
//    FRUSTUM_SIDE/2, -FRUSTUM_SIDE/2,
//    -FRUSTUM_SIDE/2, FRUSTUM_SIDE/2);
    camera.position.set(25, 5, 30);
    camera.rotation.x = -0.5
    camera.rotation.y = 0.90
    camera.rotation.z = 0.4

    new THREE.CubeTextureLoader()
        .setPath('/assets/textures/MilkyWay/')
        .load(['dark-s_px.jpg',
            'dark-s_nx.jpg',
            'dark-s_py.jpg',
            'dark-s_ny.jpg',
            'dark-s_pz.jpg',
            'dark-s_nz.jpg'], function (texture) {

                material = new THREE.MeshBasicMaterial({
                    envMap: texture,
                    side: THREE.BackSide,
                });

                let sphere = new THREE.Mesh(new THREE.SphereGeometry(37, 32, 32), material);
                scene.add(sphere);

                console.log("init")
                const loader = new GLTFLoader().setPath('/assets/models/bill/');
                loader.load('billshouse.gltf', function (gltf) {
                    const model = gltf.scene;
                    // model.scale.set( 10, 10, 10 );
                    // model.position.set( 1, 1, 0 );

                    model.traverse(function (child) {
                        child.frustumCulled = false;
                        if (child.isMesh) {

                            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                            // roughnessMipmapper.generateMipmaps( child.material );

                        }

                    });
                    model.position.set(1, 1, 0);
                    model.scale.set(1, 1, 1);
                    console.log("printed")
                    scene.add(model);
                    //        mixer_city_banner = new THREE.AnimationMixer(model);
                    //        animation_city_banner = mixer_city_banner.clipAction(gltf.animations[0]);
                    // mixer_city_banner.clipAction( gltf.animations[ 1 ] ).play();
                    //      if (activate_animations_city_banner) {
                    //          animation_city_banner.play();
                    //        }
                    //      animate_city_banner();
                    animate();
                }, undefined, function (e) {

                    console.error(e);

                });

            });
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 8);
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(1, 1, 1);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;


    controls.movementSpeed = 10;
    controls.minPolarAngle = Math.PI * 0.01;
    controls.maxPolarAngle = Math.PI * 0.45;

    controls.minDistance = 10;
    controls.maxDistance = 45;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 100;
    controls.autoForward = false;
    controls.dragToLook = false;
    controls.panSpeed = 0.05
    controls.screenSpacePanning = false;
    controls.autoRotate = false;
    let container = document.getElementById('model');
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // container.addEventListener("mouseover", (event) => {
    //     activate_animations_city_banner = true
    //     animation_city_banner.play();
    //     animate_city_banner();
    // });

    // container.addEventListener("mouseout", (event) => {
    //     animation_city_banner.stop();
    //     activate_animations_city_banner = false
    // });

}
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
}
