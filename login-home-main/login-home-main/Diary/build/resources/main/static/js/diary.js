document.addEventListener("DOMContentLoaded", function () {
    // write.html에서 저장된 날짜 정보 불러오기
    const selectedDate = loadSelectedDate();
    let dateString = null;


    if (selectedDate) {
        // 선택한 날짜 정보 활용
        console.log(selectedDate.year, selectedDate.month, selectedDate.day);

        // 선택한 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환
        dateString = formatDateString(selectedDate.year, selectedDate.month, selectedDate.day);
        // 페이지 로드 시 해당 날짜의 배경색을 설정
        const savedColor = loadBackgroundColor(dateString);
        if (savedColor) {
            document.body.style.backgroundColor = savedColor;
            document.getElementById("backgroundColor").value = savedColor;
        }
    }

    // write_area 폼 요소 가져오기
    const writeForm = document.querySelector('#writeForm');

    // 만약 선택한 날짜 정보가 있다면, 해당 날짜로 일기 작성 폼 초기화
    if (selectedDate) {
        initDiaryForm(dateString);
    }

    // 글 작성 버튼 클릭 이벤트 리스너 추가
    writeForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 폼의 기본 동작 방지 (새로고침)

        // 제목과 내용 가져오기
        const title = document.querySelector('#utitle').value;
        const content = document.querySelector('#ucontent').value;

        // 일기 데이터를 객체로 만들기
        const diaryData = {
            title: title,
            content: content,
            date: dateString // 여기서 날짜를 선택한 날짜로 고정
        };

        // 로컬 스토리지에서 저장된 일기 목록 가져오기
        const existingDiaries = loadDiaries();

        // 선택한 날짜에 해당하는 일기 찾기
        const existingDiaryIndex = existingDiaries.findIndex(diary => diary.date === dateString);

        // 이미 해당 날짜에 일기가 있는 경우 업데이트, 없는 경우 추가
        if (existingDiaryIndex !== -1) {
            existingDiaries[existingDiaryIndex] = diaryData;
        } else {
            existingDiaries.push(diaryData);
        }

        // 로컬 스토리지에 업데이트된 일기 목록 저장
        saveDiaries(existingDiaries);

        // 선택한 날짜에 대한 배경색 저장
        const selectedColor = document.getElementById("backgroundColor").value;
        saveBackgroundColor(dateString, selectedColor);

        // 확인을 위해 콘솔에 일기 데이터 출력
        console.log('저장된 일기:', diaryData);
        alert("저장되었습니다.");

        // 여기에서 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
        // 예: 서버에 저장하는 ajax 요청 등...

        // 폼 초기화
        writeForm.reset();
        // 선택한 날짜 정보를 사용한 후에 삭제
        if (selectedDate) {
            localStorage.removeItem('selectedDate');
        }

        // 다시 일기 작성 폼 초기화
        initDiaryForm(dateString);
    });

    // 날짜가 한 자리인 경우 앞에 0을 붙이는 함수
    function padZero(value) {
        return value < 10 ? '0' + value : value;
    }

    // 날짜 정보를 'YYYY-MM-DD' 형식의 문자열로 변환하는 함수
    function formatDateString(year, month, day) {
        return `${year}-${padZero(month)}-${padZero(day)}`;
    }

    // 로컬 스토리지에서 저장된 일기 목록을 불러오는 함수
    function loadDiaries() {
        const storedDiaries = localStorage.getItem('diaries');
        try {
            return storedDiaries ? JSON.parse(storedDiaries) : [];
        } catch (error) {
            console.error('일기 목록을 불러오는 중 오류 발생:', error);
            return [];
        }
    }

    // 로컬 스토리지에 일기 목록을 저장하는 함수
    function saveDiaries(diaries) {
        localStorage.setItem('diaries', JSON.stringify(diaries));
    }

    // 로컬 스토리지에서 저장된 선택한 날짜 정보 불러오기
    function loadSelectedDate() {
        const selectedDate = localStorage.getItem('selectedDate');
        return selectedDate ? JSON.parse(selectedDate) : null;
    }

    // 일기 작성 폼 초기화 함수
    function initDiaryForm(dateString) {
        // 만약 해당 날짜에 일기가 있으면, 일기 내용을 표시
        const existingDiaries = loadDiaries();
        const selectedDateDiary = existingDiaries.find(diary => diary.date === dateString);

        // 만약 해당 날짜에 일기가 있으면, 일기 내용을 표시
        if (selectedDateDiary) {
            // 제목과 내용 가져오기
            const titleInput = document.querySelector('#utitle');
            const contentInput = document.querySelector('#ucontent');

            // 일기 내용 표시
            titleInput.value = selectedDateDiary.title;
            contentInput.value = selectedDateDiary.content;
        }
    }



    // 해당 날짜의 배경색을 로컬 스토리지에서 불러오는 함수
    function loadBackgroundColor(dateString) {
        return localStorage.getItem(dateString);
    }

    // 해당 날짜의 배경색을 로컬 스토리지에 저장하는 함수
    function saveBackgroundColor(dateString, color) {
        localStorage.setItem(dateString, color);
    }
});
function changeBackgroundColor(event) {
    document.body.style.backgroundColor = event.target.value;
    localStorage.setItem("backgroundColor", event.target.value);
}

