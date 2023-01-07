'use strict';


// Menu_v2.html - Menu filtering
window.addEventListener('click', (e) => {
  if(e.target) return
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

// ----------------------------------

// Menu_v2.html - 하단 장바구니 부분,
// option.html - 수량증감 btn
window.addEventListener('click', (e) => {
  // 수량 증감
  console.log(e.target.closest('button'));
  const plus = document.querySelector('.showMenu__plus__btn');
  console.log(plus);

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

// ----------------------------------

// inputCertification.html - 인증번호 입력
window.addEventListener('click', (e) => {
  console.log(e.target)
  const certificationBtn = document.getElementById('certification__Num');
  if(e.target.closest('button').dataset.val) {
    if(certificationBtn.value.length < 4) {
      certificationBtn.value += e.target.closest('button').dataset.val;
      console.log(certificationBtn.value.length) 
    }
    
  }
  if(e.target.closest('button').className == 'number__del__ALL' ) {
    certificationBtn.value = "";
  }
  if(e.target.closest('button').className == 'number__pop') {
    certificationBtn.value = certificationBtn.value.slice(0, -1)
  }
});

// ----------------------------------

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
  } 

  // 끝에서 하나만 삭제
  if(e.target.closest('button').className == 'number__pop') {
    mobileNumberBtn.value = mobileNumberBtn.value.slice(0, -1)
  }

});


// ----------------------------------


// recipe.html - select click on order list
window.addEventListener('click', (e) => {
  console.log(e.target);
  const active = document.querySelector('.orderNum__list.selected');




  if (active != null) {
    active.classList.remove('selected');
  } else {
    e.target.classList.add('selected');
  }


});

window.addEventListener('click', (e) => {
  console.log(e.target)
  const selectMenu = document.querySelector('.order__menu');

      // 버그 잡기
      // const target = e.target.nodeName === 'li' ? e.target : e.target.parentNode;
      // target.classList.add('selected')
    
  if (selectMenu != null) {
    selectMenu.classList.remove('selected');
  } else {
    e.target.classList.add('selected');
  }

});



