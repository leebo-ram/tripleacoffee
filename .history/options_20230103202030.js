'use strict';

// -------------------------------------------------


// 아래 코드는 options.html의 옵션을 선택시에 강조표시하는 코드인데 첫째줄에만 선택이 되고 선택취소는 되지 않는다. , main.js에 취합시 에러때문에 아래코드가 실행되지 않는다.
// const secletOpstions = document.querySelector('.prod-buy__quantity');
// console.log(secletOpstions);
// secletOpstions.addEventListener('click', (e) => {
//   const active = document.querySelector('.prod-quantity__form.selected');
//   console.log(e.target);
//     if (active != null) {
//       console.log('출력해줘');
//       active.classList.remove('selected');
//     } else {
//       e.target.classList.add('selected');
//       console.log('출');
//     }
//   });

window.addEventListener('click', (e) => {
  // 선택
  if(e.target.className == 'prod-quantity__form') {
      e.target.classList.add('selected');
  }else if(e.target.className == 'prod-quantity__form selected') {
      e.target.classList.remove('selected');
  }


  // 수량 증감
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


  
