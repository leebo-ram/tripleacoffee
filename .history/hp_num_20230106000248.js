'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('hp_num');
 
  // 핸드폰번호
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 11) {
      target.value += e.target.closest('button').dataset.val;
      console.log(target.value.length) 
    }
    
  }
  if(e.target.closest('button').className == 'number__del__ALL' ) {
    target.value = "";
  }
  if(e.target.closest('button').className == 'number__pop') {
    target.value = target.value.slice(0, -1)
  }
  
});
