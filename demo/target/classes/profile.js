 // 프로필 이미지 변경 기능 (이전 코드와 동일)
 document.getElementById("changeProfileButton").addEventListener("click", function () {
    document.getElementById("profileImageInput").click();
});

document.getElementById("profileImageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const profileImage = document.getElementById("profileImage");
        profileImage.src = URL.createObjectURL(file);
    }
});
