'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('mobileNumber');


  // Button 클릭시 input에 입력
  if(e.target.closest('div').dataset.val) {
    if(target.value.length < 11) {
      console.log(target);
      target.value += e.target.closest('div').dataset.val;
      console.log(target.value.length) 
    }
  }

  // 전체 삭제
  if(e.target.closest('div').className == 'number__del__ALL' ) {
    target.value = "";
  }

  // 끝에서 하나만 삭제
  if(e.target.closest('div').className == 'number__pop') {
    target.value = target.value.slice(0, -1)
  }



  window.onkeyup ('click', (e) => {
    if (e.target.autoHyphen2) {
      target.value = target.value
      .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    }
  
  });
  
  



});





// 전화번호 하이픈 자동생성
const autoHyphen2 = (target) => {
  target.value = target.value
    .replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// window.onkeyup = (e) => {
//   if (e.target.autoHyphen2) {
//     target.value = target.value
//     .replace(/[^0-9]/g, '')
//   .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
//   }

// };
