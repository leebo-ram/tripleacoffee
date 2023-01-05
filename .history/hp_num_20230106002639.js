'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('hp__numbers');
  if(e.target.closest('button').dataset.val) {
    console.log(target);
    if(target.value.length < 11) {
      target.value += e.target.closest('button').dataset.val;
      console.log(target.value.length) 
    }
  }

  // 전체 삭제
  // if(e.target.closest('button').className == 'number__del__ALL' ) {
  //   target.value = "";
  // }

  // 끝에서 하나만 삭제
  // if(e.target.closest('button').className == 'number__pop') {
  //   target.value = target.value.slice(0, -1)
  // }
});
