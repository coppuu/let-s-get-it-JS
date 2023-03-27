const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div'); // 결과창
const rows = []; // 줄을 저장할 공간을 배열로 만듦.
let turn = 'O'; // turn은 o 


// [
//    [td, td, td],
//    [td, td, td],
//    [td, td, td],
// ]


const checkWinner = (target) => {
    let rowIndex; // 몇 번째 줄인지
    let cellIndex;  // 몇 번째 칸인지
    rows.forEach((row, ri) => { // forEach는 인덱스를 제공해줌
        row.forEach((cell, ci) => {
        if( cell === target ) {
            rowIndex = ri;
            cellIndex = ci;
        }
    });
});
// 세 칸 다 채워졌나?
let hasWinner = false; // 검사할 때 시작은 false로 하고 승자가 있으면 true로 바꿔줌.
// 가로줄 검사
if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn)
    {
        hasWinner = true;
    }
    // 세로줄 검사
    if (
        rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn)
        {
            hasWinner = true;
        } 
        // 대각선 검사
        if (
            rows[0][0].textContent === turn &&
            rows[1][1].textContent === turn &&
            rows[2][2].textContent === turn
        ) {
            hasWinner = true;
        }
        if (
            rows[0][2].textContent === turn &&
            rows[1][1].textContent === turn &&
            rows[2][0].textContent === turn
        ) {
            hasWinner = true;
        }
        return hasWinner;
    };



const callback = (e) => { 
    if(e.target.textContent !== '') { // 클릭된 칸이 빈칸이 아니면
        console.log('빈 칸이 아닙니다'); 
    } else {   // 클릭된 칸이 빈칸이면
        console.log('빈 칸입니다');
        e.target.textContent = turn; // 클릭된 칸의 텍스트를 'O'로 채우겠다.
        if (checkWinner(e.target)) {
            $result.textContent = `${turn}님이 승리!`;
            return;
        }
        // 무승부 검사
        let draw = true;
        rows.forEach((row) => {
            row.forEach((cell) => {
                if(!cell.textContent) {  // 한 칸이라도 비어있으면
                    draw = false;   // 무승부가 아님
                }
            });
        });
        if(draw) {   // 모든 칸이 차 있으면
            $result.textContent = `무승부`; // 무승부다.
            return;
        }
        turn = turn === 'X' ? 'O' : 'X'; //turn이 X면 O로 바꾸고 아니면 X로 바꿔라.
    //  if문으로 바꾸면
    //    if (turn === 'X') {
    //     turn = 'O';
    //    } else {
    //     turn = 'X';
    //    }
        
};
}

for(let i = 1; i <= 3; i++) {   // tr 3줄
    const $tr = document.createElement('tr'); // 한 줄을 선택하는 태그
    const cells = []; // 한 줄 안에 요소인 td를 저장할 배열을 만듦.
    for (let j = 1; j <= 3; j++) { // td 3개/1줄당, 총 9개
        const $td = document.createElement('td'); // td를 선택하는 태그
     
        cells.push($td); // td의 내용을 cells 배열에 push 한다.
        $tr.appendChild($td); // tr에 td를 추가한다. (줄에 td칸을 추가한다)
    }
    rows.push(cells);
    $table.appendChild($tr);
}
$table.addEventListener('click', callback); // 이벤트버블링
body.appendChild($table);
body.appendChild($result);