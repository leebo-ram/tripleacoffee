'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target_hp)
  const target_hp = document.getElementById('phoneNum');
  if(e.target_hp.closest('button').dataset.val) {
    if(target_hp.value.length < 11) {
      console.log(target_hp);
      target.value += e.target_hp.closest('button').dataset.val;
      console.log(target_hp.value.length) 
    }
  }

  // 전체 삭제
  if(e.target_hp.closest('button').className == 'number__del__ALL' ) {
    target_hp.value = "";
  }

  // 끝에서 하나만 삭제
  if(e.target_hp.closest('button').className == 'number__pop') {
    target_hp.value = target_hp.value.slice(0, -1)
  }
});
