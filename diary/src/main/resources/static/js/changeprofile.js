 document.getElementById('changeProfileButton').addEventListener('click', function () {
    changeProfile();
  });

  function changeProfile() {
    const profileTextElement = document.querySelector('.profile-text');
    const profileUsernameElement = document.querySelector('.profile-username');

    const profileText = profileTextElement.innerText;
    const profileUsername = profileUsernameElement.innerText;

    profileTextElement.innerHTML = `<input type="text" id="newProfileText" value="${profileText}">`;
    profileUsernameElement.innerHTML = `<input type="text" id="newProfileUsername" value="${profileUsername}">`;

    // 저장 버튼 추가
    const saveButton = document.createElement('button');
    saveButton.textContent = '저장';
    saveButton.addEventListener('click', saveChanges);
    profileUsernameElement.appendChild(saveButton);

    // 프로필 변경 버튼 숨김 (제거)
    document.getElementById('changeProfileButton').style.display = 'none';
  }

  function saveChanges() {
    const newProfileText = document.getElementById('newProfileText').value;
    const newProfileUsername = document.getElementById('newProfileUsername').value;

    const profileTextElement = document.querySelector('.profile-text');
    const profileUsernameElement = document.querySelector('.profile-username');

    profileTextElement.innerHTML = newProfileText;
    profileUsernameElement.innerHTML = `<span style="color: #0f1b5c">${newProfileUsername}</span>`;

    // 프로필 변경 버튼 다시 보이기
    document.getElementById('changeProfileButton').style.display = 'inline-block';

    // 프로필 사진 변경 버튼 숨기기
    document.getElementById('changeProfileImageButton').style.display = 'none';
  }


  document.getElementById('changeProfileButton').addEventListener('click', function () {
    showChangeProfileImage();
  });

  document.getElementById('changeProfileImageButton').addEventListener('click', function () {
    document.getElementById('profile-image-input').click();
  });

  // 프로필 사진 변경 버튼 표시
  function showChangeProfileImage() {
    document.getElementById('changeProfileImageButton').style.display = 'inline-block';
  }

  // 파일 선택 시 실행되는 함수
  document.getElementById('profile-image-input').addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];
    const profileImage = document.getElementById('profileImage');

    // 파일을 읽어서 이미지로 설정
    const reader = new FileReader();
    reader.onload = function () {
      profileImage.src = reader.result;
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  });

  