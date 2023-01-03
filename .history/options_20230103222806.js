'use strict';

// 옵션 최상단 부분 수량증감 btn
window.addEventListener('click', (e) => {
  // 수량 증감
  console.log(e.target.closest('button'))
  if(e.target.closest('button').className == 'showMenu__plus__btn') {
      console.log("+")
      console.log(e.target.closest('button').firstElementChild.value);
      const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
      console.log(target);
      target.value ++;
  }else if (e.target.closest('button').className == 'showMenu__minus__btn') {
      console.log('-')
      const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
      console.log(target);
      target.value --;
  }
});




window.addEventListener('click', (e) => {
  // 옵션 선택시 border color 지정해주기
  if(e.target.className == 'prod-quantity__form') {
      e.target.classList.add('selected');
  }else if(e.target.className == 'prod-quantity__form selected') {
      e.target.classList.remove('selected');
  }


  // 옵션 수량 증감 btn
  console.log(e.target.closest('button'))
  if(e.target.closest('button').className == 'prod-quantity__plus') {
      console.log("+")
      console.log(e.target.closest('button').firstElementChild.value);
      const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
      console.log(target);
      target.value ++;
  }else if (e.target.closest('button').className == 'prod-quantity__minus') {
      console.log('-')
      const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
      console.log(target);
      target.value --;
  }

})



