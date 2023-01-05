'use strict';


// Menu_v2.html - Menu filtering
window.addEventListener('click', (e) => {
  if(e.target.classList.contains('category__btn')) {
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
      active.classList.remove('selected');
    }
    if(!e.target.classList.contains('selected')) e.target.classList.add('selected');
    const filter = e.target.closest('button').dataset.filter
    const menus = document.querySelectorAll('.wrap');
    menus.forEach((wrap) => {
      // console.log(wrap.dataset.type);
      if(filter ==='*' || filter === wrap.dataset.type) {
        wrap.classList.remove('invisible');
      } else {
        wrap.classList.add('invisible');
      }
    });
    return;
  }
})


// Menu_v2.html - 장바구니 부분,
// option.html - 수량증감 btn
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
  } else if(e.target.closest('button').className == 'prod-quantity__plus') {
    console.log("+")
    console.log(e.target.closest('button').firstElementChild.value);
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    target.value ++;
} else if (e.target.closest('button').className == 'prod-quantity__minus') {
    console.log('-')
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    target.value --;
  }
});


// inputCertification.html - 인증번호 입력
window.addEventListener('click', (e) => {
  let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  //console.log(num[0]);

  console.log(e.target.closest('button'))
  if(e.target.closest('button').className == 'number1') {
    console.log(num[0])
    console.log(e.target.closest('button').firstElementChild.value);
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    target.value = num[0]++;
    for (let num = 0; num < array.length; num++) {
      const element = array[num];
      console.log(element);
    }
    
  } else if (e.target.closest('button').    className == 'number2') {
    console.log(num[1])
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    // target.value = 2;
    target.value = num[1];
  } else if (e.target.closest('button').    className == 'number3') {
    console.log(num[2])
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    target.value = 3;
  }
});




