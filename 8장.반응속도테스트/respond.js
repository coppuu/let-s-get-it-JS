const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;  // 첫 시간
let endTime;    // 끝 시간 기록한다.
const records = []; // 평균 반응속도를 구하기 위해 반응속도 전부를 배열에 저장함.
let timeoutId; 

$screen.addEventListener('click', function () {
    if($screen.classList.contains('waiting')) { // 대기화면 상태라면
        $screen.classList.remove('waiting'); // className 중 waiting 제거
        $screen.classList.add('ready');  // className에 ready 추가
        $screen.textContent = '초록색이 되면 클릭하세요';
        timeoutId = setTimeout (function () {
            startTime = new Date(); // 초록색되면 시간을 재기 시작한다.
            $screen.classList.remove('ready'); // 준비화면을 제거
            $screen.classList.add('now');   // 초록색 화면으로 변경
            $screen.textContent = '클릭하세요!';
        }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 사이에 랜덤으로
    } else if ($screen.classList.contains('ready')) { // 빨간색 화면일 때 클릭하면
        clearTimeout(timeoutId);  // 초록색 화면 뜨게 하는 setTimeout 작동 중지시킴
        $screen.classList.remove('ready'); // 빨간색 화면 제거
        $screen.classList.add('waiting');  // 파란색 대기 화면으로 변경
        $screen.textContent = '너무 성급하시군요!'; // 경고메시지
 
    } else if ($screen.classList.contains('now')) {  // 초록색 화면
    endTime = new Date();  // 끝시간 측정
    const current = endTime - startTime; // 걸린 시간을 current에 저장함.
    records.push(current);  // current에 저장된 것을 records 배열에 저장함.
    const average = records.reduce((a,c) => a+ c) / records.length;
    $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
    startTime = null;  // 값을 초기화해줌 (실수로 예전값이 다음번에도 쓰이는 걸 방지하기 위해서)
    endTime = null;    // 꼭 해줘야 하는 것은 아님.

    $screen.classList.remove('now');  // 초록색화면 제거
    $screen.classList.add('waiting');  // 파란색 화면으로 변환
    $screen.textContent = '클릭해서 시작하세요.';
    }
});