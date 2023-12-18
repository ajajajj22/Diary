document.getElementById("stickerButton").addEventListener("click", function () {
    const fileInput = document.getElementById("imageInput");
    const stickerContainer = document.getElementById("stickerContainer");

    const imageFile = fileInput.files[0];

    const reader = new FileReader();



    reader.onload = function (event) {
        const imageElement = document.createElement("img");
        imageElement.src = event.target.result;

        imageElement.onload = function () {
            const stickerElement = document.createElement("div");
            stickerElement.className = "sticker";
            stickerElement.appendChild(imageElement);

            stickerContainer.appendChild(stickerElement);

            makeStickerDraggable(stickerElement);
            makeStickerResizable(stickerElement);

            // 이미지 크기 조정
            const originalWidth = imageElement.width;
            const originalHeight = imageElement.height;
            const scaleFactor = 0.3; // 이미지 크기를 10분의 1로 조정할 비율
            imageElement.style.width = originalWidth * scaleFactor + "px";
            imageElement.style.height = originalHeight * scaleFactor + "px";

            // 스티커의 초기 크기 설정
            stickerElement.style.width = "50px";
            stickerElement.style.height = "25px";
            stickerElement.style.position = "absolute";
            stickerElement.style.overflow = "visible";
        };
    };

    reader.readAsDataURL(imageFile);
});
function makeStickerDraggable(stickerElement) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    stickerElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        stickerElement.style.top = stickerElement.offsetTop - pos2 + "px";
        stickerElement.style.left = stickerElement.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 스티커 리사이즈 기능 추가
function makeStickerResizable(stickerElement) {
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    stickerElement.appendChild(resizeHandle);

    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener("mousedown", initResize, false);

    function initResize(e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(
            document.defaultView.getComputedStyle(stickerElement).width,
            10
        );
        startHeight = parseInt(
            document.defaultView.getComputedStyle(stickerElement).height,
            10
        );
        document.documentElement.addEventListener("mousemove", resize, false);
        document.documentElement.addEventListener("mouseup", stopResize, false);
    }

    function resize(e) {
        const width = startWidth + e.clientX - startX;
        const height = startHeight + e.clientY - startY;
        stickerElement.style.width = width + "px";
        stickerElement.style.height = height + "px";
    }

    function stopResize() {
        document.documentElement.removeEventListener("mousemove", resize, false);
        document.documentElement.removeEventListener("mouseup", stopResize, false);
    }
}