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

// profile.js 파일

// 사용자가 프로필을 변경하고 저장할 때 호출되는 함수
function saveProfileChanges() {
    // 사용자가 변경한 프로필 정보를 가져옵니다.
    const profileName = document.getElementById('profileNameInput').value;
    const profileImage = document.getElementById('profileImageInput').files[0]; // 파일 업로드 처리는 별도로 필요

    const profileBio = document.getElementById('profileBioTextarea').value;

    // 프로필 정보를 FormData 객체에 담습니다.
    const formData = new FormData();
    formData.append('profileName', profileName);
    formData.append('profileImage', profileImage);
    formData.append('profileBio', profileBio);

    // AJAX를 이용하여 서버로 프로필 정보를 전송합니다.
    fetch('/save-profile', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // 성공적으로 저장되었을 때의 처리
        console.log('프로필이 성공적으로 저장되었습니다.', data);
    })
    .catch(error => {
        // 오류 처리
        console.error('프로필 저장 중 오류가 발생했습니다.', error);
    });
}
