'use strict';

// menu_v2.html 참고사항 : Menu filtering 작업은 div로 2개로 나뉘어져 있으므로 필터링 코드도 2개로 나뉘게 되었다.
// Menu filtering1 (첫번째줄)
// const wrapBtncontainer = document.querySelector('.menu__categories1');
// const menucontainer = document.querySelector('.wrap___list');
// const menus = document.querySelectorAll('.wrap');
// wrapBtncontainer.addEventListener('click', (e) => {
//   const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
//   if (filter == null) {
//     return;
//   }

// menu.html Navbar seclect category__btn
// Remove selection from the previous item and Select the new one  --> 아래 로직 이용시 selected에 대한 css도 정의해줘야함.
//     const active = document.querySelector('.category__btn.selected');
//     if (active != null) {
//       active.classList.remove('selected');
//     } else {
//       e.target.classList.add('selected');
//     }

//   menus.forEach((wrap) => {
//     // console.log(wrap.dataset.type);
//     if(filter ==='*' || filter === wrap.dataset.type) {
//       wrap.classList.remove('invisible');
//     } else {
//       wrap.classList.add('invisible');
//     }
//   });
// });

// Menu filtering2 (두번째줄)
const wrapBtncontainer2 = document.querySelector('.menu__categories2');
wrapBtncontainer2.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
      active.classList.remove('selected');
    }else{
      e.target.classList.add('selected');
    }
  
  menus.forEach((wrap) => {
    // console.log(wrap.dataset.type);
    if(filter ==='*' || filter === wrap.dataset.type) {
      wrap.classList.remove('invisible');
    } else {
      wrap.classList.add('invisible');
    }
  });
});

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



// 메뉴 장바구니 부분, 옵션 최상단 부분 수량증감 btn
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
}else if (e.target.closest('button').className == 'prod-quantity__minus') {
    console.log('-')
    const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    console.log(target);
    target.value --;
  }
});




