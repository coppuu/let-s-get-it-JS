const candidate = Array(45).fill().map((v, i) => i+1); 
// 1부터 45개의 공(숫자)을 숫자의 순서를 무작위로 뽑아서 정렬한다.


// 피셔-에이츠 셔플
const shuffle = []; // 전체 숫자를 랜덤으로 뽑은 순서로 정렬할 저장공간을 만든다.

while (candidate.length > 0) { // candidate 배열에 남은 숫자가 0이 될 때까지
    const random = Math.floor(Math.random()*candidate.length); // 랜덤으로 뽑은 숫자를 random 변수에 저장함.
    const spliceArray = candidate.splice(random, 1); // 뽑은 숫자를 배열에서 제거하고 그 값을 spliceArray에 저장함.
    const value = spliceArray[0]; // 뽑은 숫자를 value에 저장하고
    shuffle.push(value);  // 그 값을 shuffle에 입력한다.
}

console.log(shuffle);

const winBalls = shuffle.slice(0,6).sort((a,b) => a - b); // 무작위로 순서 정한 것 중에서 0번째부터 5번째까지의 숫자를 오름차순으로 정렬해서 저장함.
const bonus = shuffle[6]; // 무작위로 순서를 정한 것 중에서 (0,1,2,3,4,5)6번째 순서의 숫자를 보너스 숫자로 저장함.

console.log(winBalls, bonus); 


function colorize(number, $tag) {
    if (number < 10) {
        $tag.style.backgroundColor = 'rgb(221,75,13)';
        $tag.style.color = 'white'
    } else if (number < 20) {
        $tag.style.backgroundColor = 'rgb(221,75,13)';
        $tag.style.color = 'white';
    } else if (number < 30) {
        $tag.style.backgroundColor = 'rgb(242,182,32)';
        $tag.style.color = 'white';
    } else if (number < 40) {
        $tag.style.backgroundColor = 'rgb(64,114,171)';
        $tag.style.color = 'white';
    } else {
        $tag.style.backgroundColor = 'rgb(21,190,75)';
        $tag.style.color = 'white';
    }
}

const $result = document.querySelector('#result');

function drawBall(number, $parent) {
    const $ball = document.createElement('div'); // div를 만들고나서 그 태그를 선택하는 변수를 만듦.
    $ball.className = 'ball'; // 그 태그의 class 지정
    colorize(number, $ball);
    $ball.textContent = number;  // 그 안에 있는 숫자는 number를 넣어줌.
    $parent.appendChild($ball);   //
}


for (let i = 0; i < winBalls.length; i++) {
    setTimeout(() => {
        drawBall(winBalls[i], $result);
    },1000 * (i + 1));
}

const $bonus = document.querySelector('#bonus');
setTimeout (() => {
    drawBall(bonus, $bonus);
}, 7000);



