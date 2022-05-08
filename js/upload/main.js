document.addEventListener('alpine:init', () => {
    Alpine.data('guategeeks', () => ({
        uploadElement() {
            loadElement()
        }
    }));
})

window.addEventListener('DOMContentLoaded', (event) => {
    let modelInput = document.getElementById('modelInput')
    modelInput.addEventListener("change", handleFiles, false);
    function handleFiles() {
        let fileList = this.files;
        console.log(fileList)
    }
});

let loadElement = () => {

    let modelInput = document.getElementById('modelInput')
    
    var formdata = new FormData();
    formdata.append("model", modelInput.files[0]);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/upload/blob", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    console.log(modelInput)
}