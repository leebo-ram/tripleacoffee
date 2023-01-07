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
  
      // 전화번호 하이픈 자동생성
      target.value = target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "")
      .replace(/(?<=.{12})./gi, "*");
      console.log(target.value);
    }
    
  }

  // 전체 삭제
  if(e.target.closest('button').className == 'number__del__ALL' ) {
    target.value = "";
  }

  // 끝에서 하나만 삭제(Delete key)
  if(e.target.closest('button').className == 'number__pop') {
    target.value = target.value.slice(0, -1)
  }



});



// 전화번호 하이픈 자동생성 정규식
// const autoHyphen2 = (target) => {
//   target.value = target.value
//     .replace(/[^0-9]/g, '')
//   .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
// }


function make_mask_id(taxId){
  
  var maskedId = "";
  if(!taxId){
    return maskedId;
  }
  if(taxId.length < 5){
    maskedId = taxId.replace(/[0-9a-zA-Z]/g, "*");
  } else {
    mobileNumber =
      taxId.substring(0,4).replace(/[0-9a-zA-Z]/g, "*") + taxId.substring(4);
  }

  document.form1.id.value = taxId;
  document.form1.mobileNumber.value = mobileNumber;
}