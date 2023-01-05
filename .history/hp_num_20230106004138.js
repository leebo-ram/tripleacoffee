'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('phoneNum');
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 11) {
      console.log(target);
      target.value += e.target.closest('button').dataset.val;
      console.log(target.value.length) 
    }
  }

  // 전체 삭제
  if(e.target.closest('button').className == 'number__del__ALL' ) {
    target.value = "";
  }

  // 끝에서 하나만 삭제
  if(e.target.closest('button').className == 'number__pop') {
    target.value = target.value.slice(0, -1)
  }

  // 전화번호 하이픈 자동생성
  const hypenTel = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }

  if(e.target.closest('button').dataset.val) {
    const hypenTel = (target) => {
      target.value = target.value
      .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }
  }


});

