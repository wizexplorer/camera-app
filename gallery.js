setTimeout(() => {

    if (db) {
        // videos retrieval

        let videoDBTransaction = db.transaction("video", "readonly");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.getAll(); // event driven
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector('.gallery-cont');
            videoResult.forEach((videoObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);
                let url = URL.createObjectURL(videoObj.blobData);

                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay loop src="${url}"></video>
                </div>
                <div class = "action-btn-cont">
                    <div class="delete action-btn"><span>Delete</span></div>
                    <div class="download action-btn"><span>Download</span></div>
                </div>
                `;
                galleryCont.appendChild(mediaElem);

                // Listeners
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener)
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener)
            });
        }

        // images retireval
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll(); // event driven
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector('.gallery-cont');
            imageResult.forEach((imageObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", imageObj.id);
                let url = imageObj.url;

                mediaElem.innerHTML = `
                <div class="media">
                    <img src="${url}"/>
                </div>
                <div class = "action-btn-cont">
                    <div class="delete action-btn"><span>Delete</span></div>
                    <div class="download action-btn"><span>Download</span></div>
                </div>
                `;
                galleryCont.appendChild(mediaElem);

                // Listeners
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener)
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener)
            });
        }

    }
}, 100)

function deleteListener(e) {
    // DB removal
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    if (id.slice(0, 3) === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if (id.slice(0, 3) === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        imageStore.delete(id);
    }

    // UI removal
    e.target.parentElement.parentElement.parentElement.remove();
}

function downloadListener(e) {
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    if (id.slice(0, 3) === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result; //returns vid obj
            // console.log(video);
            let videoUrl = URL.createObjectURL(videoResult.blobData);
            let a = document.createElement("a");
            a.href = videoUrl;
            a.download = "stream.mp4";
            a.click();
        }
    }
    else if (id.slice(0, 3) === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result; //returns img obj
            let a = document.createElement("a");
            a.href = imageResult.url;
            a.download = "image.jpg";
            a.click();
        }
    }
}