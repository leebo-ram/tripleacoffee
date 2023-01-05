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
  console.log(e.target)
  const target = document.getElementById('certification__Num');
  const target_hp = document.getElementById('hp__numbers');
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 4) {
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

  
  // 핸드폰번호
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 4) {
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














// inputCertification.html - 인증번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const target = document.getElementById('hp__numbers');
 
  // 핸드폰번호
  if(e.target.closest('button').dataset.val) {
    if(target.value.length < 4) {
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
