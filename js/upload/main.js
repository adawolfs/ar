const uploadPath = `${config.backend}/upload/`;

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
    let thumbnailInput = document.getElementById('thumbnailInput')
    let fileNameInput = document.getElementById('fileNameInput')
    
    var formdata = new FormData();
    formdata.append("model", modelInput.files[0]);
    formdata.append("preview", thumbnailInput.files[0]);
    formdata.append("name", fileNameInput.value);

    var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch(uploadPath, requestOptions)
    .then(response => {
        if(response.status === 200) {
            window.location.href = `model.html?open=${fileNameInput.value}`
        } else {
            alert('Error uploading file')
        }
    })
    .catch(error => console.log('error', error));
    console.log(modelInput)
}