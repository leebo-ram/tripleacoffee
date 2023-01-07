'use strict';

// stampMemberCheck.html - 핸드폰 번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('mobileNumber');


  // Button 클릭시 target에 입력
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 13) {
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
  target.value = target.value
  .replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");

  // 마스킹 처리
  // target.value = target.value.replaceAll("-[0-9]{4}$", "-****");

  // const maskingIdNum = watch('button').replace(/-/g, '').replace(/(\d{6})(\d{1})(\d{6})/, '$1-$2******');
  // setMaskingNum(maskingIdNum);

  if(target.value.length == 13){   
    // 11자리인 경우. 000-****-0000로 지환
    return target.substring(0, 3) + "-****-" + target.substring(7, 11);
}


});




// 전화번호 하이픈 자동생성 정규식
// const autoHyphen2 = (target) => {
//   target.value = target.value
//     .replace(/[^0-9]/g, '')
//   .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
// }



