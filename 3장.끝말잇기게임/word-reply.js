

const number = Number([prompt("몇 명이 참가하나요?")], 10);
if (number) {
const $button = document.querySelector("button");
const $input = document.querySelector("input");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");
let word; // 제시어
let newWord; // 현재 입력된 단어

const onClickButton = () => {

  if (newWord.length === 3 && (!word || word[word.length - 1] === newWord[0])) {
    // 세 글자면서 제시어가 비어 있거나 입력한 단어가 올바른가?
    word = newWord; // 입력된 단어가 제시어가 된다.
    $word.textContent = word; // 화면에 제시어를 표시한다.

    const order = Number($order.textContent);
    if (order + 1 > number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
    $input.value = "";
    $input.focus();
  } else {
    // 올바르지 않다.
    alert("땡");
    $input.value = "";
    $input.focus();
  }
};

const onInput = (e) => {
  newWord = e.target.value; //입력하는 단어를 현재 단어로
};

$button.addEventListener("click", onClickButton);
$input.addEventListener("input", onInput);

}