document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // 입력된 사용자 이름과 비밀번호 가져오기
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 간단한 확인 메시지 생성
    var message = "로그인 완료! 사용자 이름: " + username;

    // 알림 팝업으로 메시지 표시
    alert(message);
});