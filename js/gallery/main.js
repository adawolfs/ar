const uploadPath = `${config.backend}/upload/`;
const uploadsPath = `${config.backend}/uploads/`;
document.addEventListener('alpine:init', () => {
    Alpine.data('ARgallery', () => ({
        uploadsPath: uploadsPath,
        uploadedFiles: [''],
        openModel(file) {
            console.log(file)
            window.location.href = `/model.html?open=${file}`
        },
        getUploads() {
            const requestOptions = {
                method: 'GET',
            };
            fetch(uploadPath, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.uploadedFiles = result.uploads
                console.log(this.uploadedFiles)
            })
            .catch(error => console.log('error', error));
        }
    }));
})
