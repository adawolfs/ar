
const uploadsPath = `${config.backend}/uploads`;

console.log(uploadsPath)

window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('open')) {
        const file = params.get('open')
        let scene = document.getElementById('aframe-scene')
        const modelURL = `${uploadsPath}/${file}/model/scene.gltf`
        console.log(modelURL)
        scene.setAttribute('model-viewer', 'gltfModel', modelURL);
        scene.setAttribute('model-viewer', 'title', file);
    }
    
});
