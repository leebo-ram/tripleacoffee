'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const mobileNumberBtn = document.getElementById('mobileNumber');


  // Button 클릭시 target에 입력
  if(e.target.closest('button').dataset.val) {
    if(mobileNumberBtn.value.length < 13) {
      console.log(mobileNumberBtn);
      mobileNumberBtn.value += e.target.closest('button').dataset.val;
      console.log(mobileNumberBtn.value.length) 

      // 전화번호 하이픈 자동생성
      let masking = '';
      for(let i=0; i<mobileNumberBtn.value.length-9; i++) {
        masking += '*';
      }
      mobileNumberBtn.value = mobileNumberBtn.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")

      // 맨 끝 4자리만 마스킹 처리 => 010-1234-****
      .replace(/(?<=.{9})./g, `${masking}`);
    }
  }

  // 전체 삭제
  if(e.target.closest('button').className == 'number__del__ALL' ) {
    mobileNumberBtn.value = "";
  } else {

  }

  // 끝에서 하나만 삭제
  if(e.target.closest('button').className == 'number__pop') {
    mobileNumberBtn.value = mobileNumberBtn.value.slice(0, -1)
  }

});



// 전화번호 하이픈 자동생성 정규식
// const autoHyphen2 = (target) => {
//   target.value = target.value
//     .replace(/[^0-9]/g, '')
//   .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
// }


