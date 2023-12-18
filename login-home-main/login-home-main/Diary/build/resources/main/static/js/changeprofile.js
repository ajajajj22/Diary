document.getElementById('changeProfileButton').addEventListener('click', function () {
  changeProfile();
});

function changeProfile() {
  const profileTextElement = document.querySelector('.profile-text');
  const profileUsernameElement = document.querySelector('.profile-username');
  const titleNameElement = document.querySelector('.content-title-name');

  const profileText = profileTextElement.innerText;
  const profileUsername = profileUsernameElement.querySelector('span').innerText;
  const titleName = titleNameElement.innerText;

  profileTextElement.innerHTML = `<input type="text" id="newProfileText" value="${profileText}">`;
  profileUsernameElement.innerHTML = `<input type="text" id="newProfileUsername" value="${profileUsername}">`;
  titleNameElement.innerHTML = `<input type="text" id="newTitleName" value="${titleName}">`;

  const saveButton = document.createElement('button');
  saveButton.id = 'saveButton'; // ID 할당
  saveButton.textContent = '저장';
  saveButton.style.backgroundColor = '#e6beca';
  saveButton.style.color = '#000000';
  saveButton.style.padding = '10x 15px';
  saveButton.style.fontSize = '20px';
  saveButton.style.border = '1px solid #fff';
  saveButton.style.borderRadius = '5px';
  saveButton.style.cursor = 'pointer';
  saveButton.style.fontFamily ='kyobohand';
  saveButton.style.width ='269.31px';
  saveButton.style.height ='50.22px';
  saveButton.addEventListener('click', saveChanges);
  profileUsernameElement.appendChild(saveButton);

  document.getElementById('changeProfileButton').style.display = 'none';
  // 프로필 변경 버튼 뒤에 저장 버튼 추가하기
  const changeProfileButton = document.getElementById('changeProfileButton');
  changeProfileButton.parentNode.insertBefore(saveButton, changeProfileButton.nextSibling);

  // 프로필 변경 버튼 숨김 (제거)
  document.getElementById('changeProfileButton').style.display = 'none';
}

function saveChanges() {
  const newProfileText = document.getElementById('newProfileText').value;
  const newProfileUsername = document.getElementById('newProfileUsername').value;
  const newTitleName = document.getElementById('newTitleName').value;

  const profileTextElement = document.querySelector('.profile-text');
  const profileUsernameElement = document.querySelector('.profile-username');
  const titleNameElement = document.querySelector('.content-title-name');

  profileTextElement.innerHTML = newProfileText;
  profileUsernameElement.innerHTML = `<span style="color: #0f1b5c">${newProfileUsername}</span>`;
  titleNameElement.innerHTML = newTitleName;

  document.getElementById('changeProfileButton').style.display = 'inline-block';

  // 프로필 변경 버튼 다시 보이기
  document.getElementById('changeProfileButton').style.display = 'inline-block';
  // 프로필 사진 변경 버튼 숨기기
  document.getElementById('changeProfileImageButton').style.display = 'none';
  // 저장 버튼 숨기기
  document.getElementById('saveButton').style.display = 'none';

  // Save changes to local storage
  localStorage.setItem('profileText', newProfileText);
  localStorage.setItem('profileUsername', newProfileUsername);
  localStorage.setItem('titleName', newTitleName);

  // 여기에 프로필 이미지 저장 로직 추가
  const profileImage = document.getElementById('profileImage');
  const imageSrc = profileImage.src;
  localStorage.setItem('profileImage', imageSrc);
}


// 페이지 로드 시 저장된 정보 가져오기
document.addEventListener('DOMContentLoaded', function () {
  const profileText = localStorage.getItem('profileText');
  const profileUsername = localStorage.getItem('profileUsername');
  const titleName = localStorage.getItem('titleName');
  const profileImageSrc = localStorage.getItem('profileImage');

  if (profileText && profileUsername && titleName) {
    const profileTextElement = document.querySelector('.profile-text');
    const profileUsernameElement = document.querySelector('.profile-username');
    const titleNameElement = document.querySelector('.content-title-name');
    const profileImage = document.getElementById('profileImage');

    profileTextElement.innerText = profileText;
    profileUsernameElement.innerHTML = `<span style="color: #0f1b5c">${profileUsername}</span>`;
    titleNameElement.innerText = titleName;
    if (profileImageSrc) {
      profileImage.src = profileImageSrc;
    }
  }
});

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

document.getElementById('changeProfileButton').addEventListener('click', function () {
  changeProfile();
});
