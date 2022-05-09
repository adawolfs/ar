document.addEventListener('alpine:init', () => {
    Alpine.data('ARgallery', () => ({
        uploadedFiles: ['tesx'],
        openModel(file) {
            console.log(file)
            window.location.href = `/model.html?open=${file}`
        },
        getUploads() {
            const requestOptions = {
                method: 'GET',
            };
            fetch("http://127.0.0.1:3000/upload/", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.uploadedFiles = result.uploads
                console.log(this.uploadedFiles)
            })
            .catch(error => console.log('error', error));
        }
    }));
})
