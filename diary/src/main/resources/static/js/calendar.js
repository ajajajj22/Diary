window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고


        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }

        if (nowDay < today) {                       // 지난날인 경우
            newDIV.className = "pastDay";
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
        // 스티커 정보를 불러와서 스티커가 있으면 추가
        const stickerEmoji = loadSticker(nowDay);
        if (stickerEmoji) {
            displayStickerOnSelectedDate(newDIV, stickerEmoji);
        }
    }
}

// 날짜 선택
let selectedEmoji = '';
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
    // 모달 다이얼로그 열기
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}
// 선택된 작업 실행 (표정 설정하기 또는 일기 쓰기)
function performAction(action) {
    if (action === "emoji") {
        // "표정 설정하기" 작업 실행
        alert("표정 설정하기를 선택하셨습니다.");
    } else if (action === "diary") {
        // "일기 쓰기" 작업 실행
        alert("일기 쓰기를 선택하셨습니다.");
    }

    // 모달 다이얼로그 닫기
    closeModal();
}
// 모달 다이얼로그 닫기
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
//표정 설정하기 함수들
function showEmojiPicker() {
    const emojiPicker = document.getElementById("emojiPicker");
    emojiPicker.style.display = "block";
}

function selectEmoji(emoji) {
    alert("선택한 이모지: " + emoji);
    selectedEmoji = emoji; // 선택한 이모지를 변수에 저장
    const selectedDate = document.querySelector(".choiceDay");
    if (selectedDate) {
        // 날짜 정보 가져오기
        const year = selectedDate.parentNode.getAttribute('data-year');
        const month = selectedDate.parentNode.getAttribute('data-month');
        const day = selectedDate.textContent;
        const date = new Date(year, month, day);
        // 날짜 정보를 이용하여 스티커 저장
        saveSticker(date, emoji);
        // 스티커 표시
        displayStickerOnSelectedDate(selectedDate, emoji);
    }
    // 모달 다이얼로그 닫기
    closeModal();

    // 이모지 선택 창 닫기
    const emojiPicker = document.getElementById("emojiPicker");
    emojiPicker.style.display = "none";
    
}
function displayEmojiOnSelectedDate() {
    const selectedDate = document.querySelector(".choiceDay");
    if (selectedDate) {
        const emojiElement = document.createElement("span"); // 새로운 span 엘리먼트를 생성
        emojiElement.classList.add("emoji");
        emojiElement.innerHTML = selectedEmoji;
        selectedDate.appendChild(emojiElement); // 선택한 날짜 아래에 이모지를 추가       
    }
}
function toggleStickerAndWeatherButtons() {
    var stickerButton = document.getElementById('addStickerButton');
    var emojiButton = document.getElementById('emojiButton');
    var weatherButton = document.getElementById('weatherButton');
    var diaryButton = document.getElementById('diaryButton');
        
    // 스티커 붙이기 버튼을 누르면 "일기 쓰기" 버튼을 숨깁니다.
    diaryButton.style.display = 'none';
    
    // 숨겨진 버튼들을 토글하여 보이게 하거나 숨깁니다.
    emojiButton.style.display = 'block';
    weatherButton.style.display = 'block';
    stickerButton.style.display = 'none';
}
// 이전달 버튼 클릭
function prevCalendar() {
    
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
   
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}
const API_KEY = "53c8a3c7700b8b529deac9d34468ac87";


// "날씨 선택하기" 버튼을 클릭할 때 호출되는 함수
function showWeatherEmoji(position) {
    const selectedDate = document.querySelector(".choiceDay");

    if (selectedDate) {
        // 위치 정보를 가져온 뒤에 날씨 정보를 가져오도록 변경
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const weatherState = data.weather[0].main;
                    const weatherEmoji = getWeatherEmoji(weatherState);
                    const emojiElement = document.createElement("span");
                    emojiElement.classList.add("emoji");
                    emojiElement.innerHTML = weatherEmoji;
                    selectedDate.appendChild(emojiElement);
                })
                .catch((error) => {
                    console.error("날씨 정보를 가져오는 중 오류 발생:", error);
                });
        }, function (error) {
            console.error("위치 정보를 가져오는 중 오류 발생:", error);
        });
        // 모달 다이얼로그 닫기
    closeModal();
    }
}

// 날씨 상태에 따른 이모지를 가져오는 함수
function getWeatherEmoji(weatherState) {
    const defaultEmoji = "❓"; // 기본 이모지 (알 수 없는 날씨 상태)

    switch (weatherState) {
        case "Clear":
            return "☀️";
        case "Clouds":
            return "☁️";
        case "Rain":
            return "🌧️";
        case "Thunderstorm":
            return "⛈️";
        case "Snow":
            return "❄️";
        case "Mist":
            return "🌫️";
        default:
            return defaultEmoji;
    }
}

  // 날씨 선택 버튼 클릭 시 이벤트 핸들러
document.getElementById("showWeatherButton").addEventListener("click", showWeatherEmoji);
function onGeoerror() {
  alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(showEmojiPicker, onGeoerror);
// 스티커 정보를 저장하는 함수
function saveSticker(date, emoji) {
    // date를 문자열로 변환하여 사용하는 것이 일반적입니다.
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    localStorage.setItem(dateString, emoji);
}

// 스티커 정보를 불러오는 함수s
function loadSticker(date) {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    return localStorage.getItem(dateString);
}
// 스티커를 특정 날짜에 표시하는 함수
function displayStickerOnSelectedDate(dateElement, emoji) {
    const emojiElement = document.createElement("span");
    emojiElement.classList.add("emoji");
    emojiElement.innerHTML = emoji;
    dateElement.appendChild(emojiElement);
}
