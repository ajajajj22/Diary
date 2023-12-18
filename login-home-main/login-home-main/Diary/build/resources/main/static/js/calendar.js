
// 페이지 로드 시 달력 생성
window.onload = function () {
    buildCalendar();
};
// 현재 월과 오늘 날짜를 저장하는 변수
let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
    // 이번 달의 1일과 마지막 날을 구함
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

    // 달력을 출력할 tbody 요소 선택
    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    // 연도와 월 정보 업데이트
    document.getElementById("calYear").innerText = nowMonth.getFullYear();
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);

    // 이전에 생성된 행이 있다면 초기화
    while (tbody_Calendar.rows.length > 0) {
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    // 첫 번째 행 생성
    let nowRow = tbody_Calendar.insertRow();

    // 1일의 요일까지 빈 칸 채우기
    for (let j = 0; j < firstDate.getDay(); j++) {
        let nowColumn = nowRow.insertCell();
    }

    // 날짜를 표시하면서 달력 생성
    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRow.insertCell();
        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());
        nowColumn.appendChild(newDIV);

        // 토요일인 경우 새로운 행 추가
        if (nowDay.getDay() == 6) {
            nowRow = tbody_Calendar.insertRow();
        }

        // 날짜에 따라 클래스 설정 (지난 날, 오늘, 미래)
        if (nowDay < today) {
            newDIV.className = "pastDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }

        // 스티커 정보를 불러와서 스티커가 있으면 추가
        const stickerEmoji = loadSticker(nowDay);
        if (stickerEmoji) {
            displayStickerOnSelectedDate(newDIV, stickerEmoji);
        }
        const weatherEmoji = loadWeatherEmoji(nowDay);
        if (weatherEmoji) {
            displayStickerOnSelectedDate(newDIV, weatherEmoji);
        }

        // 데이터 속성 설정 부분 추가
        nowColumn.setAttribute('data-year', nowDay.getFullYear());
        nowColumn.setAttribute('data-month', nowDay.getMonth());
        // 날짜에 스토어된 이모지가 있으면 클래스 추가
        const storedEmoji = loadSticker(nowDay);
        const storedWeatherEmoji =loadWeatherEmoji(nowDay)
        if (storedEmoji) {
            newDIV.classList.add("storedEmoji");

        }
        if(storedWeatherEmoji){
            newDIV.classList.add("storedEmoji");
        }
    }
}
// 이전달 버튼 클릭
function prevCalendar() {
    // 현재 달을 1 감소
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    // 달력 다시 생성
    buildCalendar();
}

// 다음달 버튼 클릭
function nextCalendar() {
    // 현재 달을 1 증가
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    // 달력 다시 생성
    buildCalendar();
}

// 날짜 선택
function choiceDate(newDIV) {
    // 기존에 선택한 날짜가 있으면 해당 날짜의 "choiceDay" 클래스 제거
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }
    // 선택된 날짜에 "choiceDay" 클래스 추가
    newDIV.classList.add("choiceDay");
    const selectedDate = document.querySelector(".choiceDay");
    // 날짜 정보 가져오기
    const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
    const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
    const day = parseInt(selectedDate.textContent, 10);

    // 선택한 날짜 정보를 로컬 스토리지에 저장
    const selectedDateInfo = { year, month, day };
    localStorage.setItem('selectedDate', JSON.stringify(selectedDateInfo));
    displayDiaryDataOnModal();
    // 모달 다이얼로그 열기
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    setInitialButtonState();
}


// 선택된 이모지를 저장하는 변수
let selectedEmoji = '';





// 모달 다이얼로그 닫기
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// 표정 설정하기 함수들
function showEmojiPicker() {
    const emojiPicker = document.getElementById("emojiPicker");
    emojiPicker.style.display = "block";
}

function selectEmoji(emoji) {
    // 선택한 이모지를 알림으로 표시
    alert("선택한 이모지: " + emoji);
    // 선택한 이모지를 변수에 저장
    selectedEmoji = emoji;
    // 선택된 날짜 가져오기
    const selectedDate = document.querySelector(".choiceDay");
    if (selectedDate) {
        // 날짜 정보 가져오기
        const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
        const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
        const day = parseInt(selectedDate.textContent, 10);
        console.log("Year:", year, "Month:", month, "Day:", day);
        // 날짜 정보를 이용하여 스티커 저장
        saveSticker(new Date(year, month, day), emoji);
        // 스티커 표시
        displayStickerOnSelectedDate(selectedDate, emoji);
    }
    // 모달 다이얼로그 닫기
    closeModal();
    // 이모지 선택 창 닫기
    const emojiPicker = document.getElementById("emojiPicker");
    emojiPicker.style.display = "none";
}
// 초기 버튼 상태 설정 함수
function setInitialButtonState() {
    const diaryButton = document.getElementById('diaryButton');
    const addStickerButton = document.getElementById('addStickerButton');
    const emojiButton = document.getElementById('emojiButton');
    const weatherButton = document.getElementById('weatherButton');
    const delateButton = document.getElementById('delateButton'); // 수정된 부분


    // 스티커 붙이기 버튼을 누르면 "일기 쓰기" 버튼을 숨깁니다.
    diaryButton.style.display = 'block';
    addStickerButton.style.display = 'block';
    delateButton.style.display = 'none';
    emojiButton.style.display = 'none';
    weatherButton.style.display = 'none';
}

// 스티커 및 날씨 버튼을 토글하는 함수
function toggleStickerAndWeatherButtons() {
    const stickerButton = document.getElementById('addStickerButton');
    const emojiButton = document.getElementById('emojiButton');
    const weatherButton = document.getElementById('weatherButton');
    const diaryButton = document.getElementById('diaryButton');
    const delateButton = document.getElementById('delateButton');

    const selectedDate = document.querySelector(".choiceDay");
    if (selectedDate) {
        // 날짜 정보 가져오기
        const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
        const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
        const day = parseInt(selectedDate.textContent, 10);

        // 스티커 및 날씨 정보를 불러오기
        const storedEmoji = loadSticker(new Date(year, month, day));
        const storedWeatherEmoji = loadWeatherEmoji(new Date(year, month, day));

        if (storedEmoji || storedWeatherEmoji) {
            emojiButton.style.display = 'none';
            weatherButton.style.display = 'none';
            delateButton.style.display = 'block';
        } else {
            emojiButton.style.display = 'block';
            weatherButton.style.display = 'block';
            delateButton.style.display = 'none';
        }

        // 스티커 붙이기 버튼을 누르면 "일기 쓰기" 버튼을 숨깁니다.
        diaryButton.style.display = 'none';
        stickerButton.style.display = 'none';
    }
}


// input값이 한자리 숫자인 경우 앞에 '0'을 붙이는 함수
function leftPad(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}
// OpenWeatherMap API 키
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
                    // 날짜 정보 가져오기
                    const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
                    const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
                    const day = parseInt(selectedDate.textContent, 10);
                    console.log("Year:", year, "Month:", month, "Day:", day);
                    // 날씨 이모지를 저장
                    saveWeatherEmoji(new Date(year, month, day), weatherEmoji);

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
    const defaultEmoji = "❓";

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
// "날씨 선택" 버튼 클릭 시 이벤트 핸들러
document.getElementById("showWeatherButton").addEventListener("click", showWeatherEmoji);

// 위치 정보를 가져오지 못할 경우의 처리
function onGeoerror() {
    alert("Can't find you. No weather for you");
}
// 현재 위치 정보를 가져와서 이모지 선택 창을 보여줌
navigator.geolocation.getCurrentPosition(showEmojiPicker, onGeoerror);

// 스티커 정보를 저장하는 함수
function saveSticker(date, emoji) {
    // date를 문자열로 변환하여 사용하는 것이 일반적입니다.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // 1을 더해줌
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 스티커 정보를 불러옴
    const stickers = loadstoreStickers();
    // 해당 날짜에 스티커 정보 저장
    stickers[dateString] = emoji;
    // 스티커 정보를 로컬 스토리지에 저장
    localStorage.setItem('stickers', JSON.stringify(stickers));
    buildCalendar();
}

// 스티커 정보를 불러오는 함수
function loadSticker(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // 1을 더해줌
    const day = date.getDate();

    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 스티커 정보를 불러옴
    const stickers = loadstoreStickers();

    // 해당 날짜의 스티커 정보 반환
    return stickers[dateString];

}

// 저장된 스티커 정보를 불러오는 함수
function loadstoreStickers() {
    const storedStickers = localStorage.getItem('stickers');
    try {
        // 저장된 스티커 정보를 파싱하여 반환
        return storedStickers ? JSON.parse(storedStickers) : {};
    } catch (error) {
        // 오류 발생 시 콘솔에 로그 출력
        console.error("스티커 정보를 불러오는 중 오류 발생:", error);
        // 빈 객체 반환
        return {};
    }
}
// 스티커를 특정 날짜에 표시하는 함수
function displayStickerOnSelectedDate(dateElement, emoji) {
    const emojiElement = document.createElement("span");
    emojiElement.classList.add("emoji");
    emojiElement.innerHTML = emoji;
    dateElement.appendChild(emojiElement);



}
// 날씨 이모지를 저장하는 함수
function saveWeatherEmoji(date, emoji) {
    // date를 문자열로 변환하여 사용하는 것이 일반적입니다.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // 1을 더해줌
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 날씨 이모지 정보를 불러옴
    const weatherEmojis = loadWeatherEmojis();
    // 해당 날짜에 날씨 이모지 정보 저장
    weatherEmojis[dateString] = emoji;
    // 날씨 이모지 정보를 로컬 스토리지에 저장
    localStorage.setItem('weatherEmojis', JSON.stringify(weatherEmojis));
    buildCalendar();

}
// 날짜에 해당하는 엘리먼트 찾기
function findDateElement(year, month, day) {
    const tbody_Calendar = document.querySelector(".Calendar > tbody");
    const dateElements = tbody_Calendar.querySelectorAll(`[data-year="${year}"][data-month="${month}"] p`);

    for (const element of dateElements) {
        if (parseInt(element.innerHTML, 10) === day) {
            return element;
        }
    }

    return null;
}

// 날씨 이모지 정보를 불러오는 함수
function loadWeatherEmoji(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // 1을 더해줌
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 날씨 이모지 정보를 불러옴
    const weatherEmojis = loadWeatherEmojis();
    // 해당 날짜의 날씨 이모지 정보 반환
    return weatherEmojis[dateString];
}

// 저장된 날씨 이모지 정보를 불러오는 함수
function loadWeatherEmojis() {
    const storedWeatherEmojis = localStorage.getItem('weatherEmojis');
    try {
        // 저장된 날씨 이모지 정보를 파싱하여 반환
        return storedWeatherEmojis ? JSON.parse(storedWeatherEmojis) : {};
    } catch (error) {
        // 오류 발생 시 콘솔에 로그 출력
        console.error("날씨 이모지 정보를 불러오는 중 오류 발생:", error);
        // 빈 객체 반환
        return {};
    }
}
// 선택된 날짜의 데이터 삭제 함수
function deleteSelectedDateData() {
    const selectedDate = document.querySelector(".choiceDay");

    if (selectedDate) {
        // 날짜 정보 가져오기
        const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
        const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
        const day = parseInt(selectedDate.textContent, 10);

        // 스티커 삭제
        deleteSticker(new Date(year, month, day));

        // 날씨 이모지 삭제
        deleteWeatherEmoji(new Date(year, month, day));
        // 업데이트된 달력 다시 생성
        buildCalendar();

        // 모달 다이얼로그 닫기
        closeModal();
    }
}
function deleteSticker(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 스티커 정보를 불러옴
    const stickers = loadstoreStickers();

    // 해당 날짜의 스티커 정보 삭제
    delete stickers[dateString];

    // 업데이트된 스티커 정보를 로컬 스토리지에 저장
    localStorage.setItem('stickers', JSON.stringify(stickers));
}
// 날씨 이모지 삭제 함수
function deleteWeatherEmoji(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 날씨 이모지 정보를 불러옴
    const weatherEmojis = loadWeatherEmojis();

    // 해당 날짜의 날씨 이모지 정보 삭제
    delete weatherEmojis[dateString];

    // 업데이트된 날씨 이모지 정보를 로컬 스토리지에 저장
    localStorage.setItem('weatherEmojis', JSON.stringify(weatherEmojis));
}

// 모달 다이얼로그에 일기 데이터 표시
function displayDiaryDataOnModal() {
    const selectedDate = document.querySelector(".choiceDay");
    if (selectedDate) {
        // 날짜 정보 가져오기
        const year = parseInt(selectedDate.parentNode.getAttribute('data-year'), 10);
        const month = parseInt(selectedDate.parentNode.getAttribute('data-month'), 10);
        const day = parseInt(selectedDate.textContent, 10);

        // 날짜에 해당하는 일기 제목과 내용 가져오기
        const diaryTitle = loadDiaryTitle(new Date(year, month, day));
        const diaryContent = loadDiaryContent(new Date(year, month, day));

        // 모달 다이얼로그의 제목과 내용 엘리먼트 찾기
        const modalTitleElement = document.querySelector("#myModal .modal-content p");
        const modalContentElement = document.querySelector("#myModal .modal-content .modal-body");

        // 일기 제목 업데이트
        if (modalTitleElement) {
            modalTitleElement.innerHTML = diaryTitle ? "저장된 일기 제목: "+ diaryTitle : "일기 없음";
        }

        // 일기 내용 업데이트
        if (modalContentElement) {
            modalContentElement.innerHTML = diaryContent || "일기 없음";
        }

        // 모달 다이얼로그 열기
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        setInitialButtonState();
    }
}
// 저장된 일기 제목을 불러오는 함수
function loadDiaryTitle(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 일기 정보를 불러옴
    const diaries = loadDiaries();

    // 해당 날짜의 일기 정보가 있는지 확인하고, 제목 반환
    const diaryForDate = diaries.find(diary => diary.date === dateString);
    if (diaryForDate && diaryForDate.title) {
        return diaryForDate.title;
    }

    // 일기 정보가 없으면 빈 문자열 반환
    return "";
}

// 저장된 일기 정보를 불러오는 함수
function loadDiaries() {
    const storedDiaries = localStorage.getItem('diaries');
    try {
        const parsedDiaries = storedDiaries ? JSON.parse(storedDiaries) : [];
        console.log("Loaded Diaries:", parsedDiaries); // 디버깅 출력 추가
        return parsedDiaries;
        // 저장된 일기 정보를 파싱하여 반환
        return storedDiaries ? JSON.parse(storedDiaries) : [];
    } catch (error) {
        // 오류 발생 시 콘솔에 로그 출력
        console.error("일기 정보를 불러오는 중 오류 발생:", error);
        // 빈 배열 반환
        return [];
    }
}
// 저장된 일기 내용을 불러오는 함수
function loadDiaryContent(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = `${year}-${leftPad(month)}-${leftPad(day)}`;

    // 저장된 일기 정보를 불러옴
    const diaries = loadDiaries();
    console.log("Diaries for Content:", diaries); // 디버깅 출력 추가



    // 해당 날짜의 일기 정보 찾기
    const matchingDiary = diaries.find(diary => diary.date === dateString);

    console.log("Matching Diary Date String:", dateString);
    console.log("Matching Diary for Content:", matchingDiary); // 디버깅 출력 추가

    if (matchingDiary) {
        console.log("Matching Diary Title:", matchingDiary.title);
        console.log("Matching Diary Content:", matchingDiary.content);
    }
    // 찾은 일기의 내용 반환
    return matchingDiary ? matchingDiary.content : null;
}
function goToWritePage() {
    window.location.href = '/write';
}
function goTologinPage() {
    window.location.href = '/index';
}
