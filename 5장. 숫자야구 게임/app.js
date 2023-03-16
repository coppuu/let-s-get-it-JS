
// 태그 선택
const $input = document.querySelector('#input'); 
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');



// 하단의 주석으로 통일할 수 있는 코드

const numbers = [];   // 해당 게임에서 사용할 숫자를 number라는 배열에 저장하겠다.
for (let n=1; n<=9; n+=1) {
   numbers.push(n);   // numbers에 배열에 들어갈 값 1,2,3,4,5,6,7,8,9를 직접 쓰려면 복잡하니까 그냥 따로 뺴준 것
}

// === const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const answer = [];   // 컴퓨터가 정한 정답을 저장할 공간

//math.random() : 0이상 1미만의 숫자를 무작위로 뽑음 -> *9 -> 0이상~9미만까지를 무작위로 뽑는 것


for (let n=0; n<=3; n+=1) {  // 0,1,2,3 -> 네 번 반복 , 컴퓨터가 정한 정답을 뽑는 과정
    const index = Math.floor(Math.random()*(numbers.length)); // 0~8 정수사이에서 수 하나를 뽑아서 index에 저장  
    answer.push(numbers[index]); // 뽑은 애를 answer에 푸시하겠다.   
    numbers.splice(index, 1); // 실제로 뽑은 건 하나 지워줌
} 

console.log(answer);  // 컴퓨터가 정한 정답 표시


const tries = [];  //  user가 정답이라고 입력했던 값들을 저장 공간

function checkInput(input) {
    if(input.length !== 4) {  // 4자리를 제대로 입력했는지 검증
        return alert('4자리 숫자를 입력해 주세요.');
    }
    if(new Set(input).size !== 4) {  // 중복된 값이 있는지 검증
        return alert('중복되지 않게 입력해 주세요.');
    }
    if(tries.includes(input)) {   // 그동안 시도했던 값들 중에 방금입력한 것이 있는지 검증
        return alert('이미 시도한 값입니다.');
    }
    return true; // 위의 검증을 통과한 경우
}


// 상단의 내용이 true면 하단으로 넘어감


let out = 0;   // 이자리에 있어야만 out이 카운트 되는 이유가 뭘까,,


$form.addEventListener('submit', (event) => {
    event.preventDefault(); // 새로고침하는 기본 동작 막기
    const value = $input.value;  // 입력한 값을 value에 저장해둔다.
    $input.value = '';  // 그다음에 빈값으로 지워준다. 다음값 입력하기 편하라고
    const valid = checkInput(value); // 검사하기 위해서 checkInput함수로 value를 넣어줌.
    if(!valid) return;
    if(answer.join('') === value){     // 컴퓨터의 정답과 input에 입력된 value가 같으면
        $logs.textContent ='홈런!';    
        return;
    }
    if(tries.length >= 9) { // 10번째 시도인 순간에는 tries.length가 9이니까
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
        $logs.appendChild(message);
        return;
    }
// stirke, ball 갯수 검사 


// 프로그램에서 무언가의 숫자를 세어야 할 때는 변수를 만들어서 count 해줘야됨.
let strike = 0;  
let ball = 0;
// let out = 0; 이 자리에 있으면 out 카운트가 안 되는 이유가 뭘까,,
//0부터 시작해서 밑에 for문을 통해서 1씩 늘려감.

for( let i = 0; i < answer.length; i++) {   // 0부터 (answer.length: 4자리수) 3까지 총 4자리
   const index = value.indexOf(answer[i]); //i가 0이면, 0번째 자리에 있는 숫자의 값이 value에서 몇번째 자리인지 혹은 없으면 -1 의 값을 index 변수에 저장
   if(index > -1) { // answer에 있는 숫자와 일치하면
       if(index === i) {  // 자릿수가 같다면
           strike += 1;   // 1씩 더해줌
       } else {           // 자릿수가 다르고 숫자만 같으면
           ball += 1;     // 1씩 더해줌
    }
   }
}

if (strike === 0 && ball === 0) {
    out++
    $logs.append(`${value}: 아웃`, document.createElement('br'));
} else {
    $logs.append(`${value}:${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
}

if (out === 2) {
    const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
    return;
}
    


tries.push(value);  // user가 시도할때마다 값을 몇 번입력했는지 push하는 것


});


 