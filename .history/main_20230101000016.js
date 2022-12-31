'use strict';

const e = require('express');

// menu_v2.html 참고사항 : Menu filtering 작업은 div로 2개로 나뉘어져 있으므로 필터링 코드도 2개로 나뉘게 되었다.
// Menu filtering1 (첫번째줄)
const wrapBtncontainer = document.querySelector('.menu__categories1');
const menucontainer = document.querySelector('.wrap___list');
const menus = document.querySelectorAll('.wrap');
wrapBtncontainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

    // menu.html Navbar seclect category__btn
    // Remove selection from the previous item and Select the new one  --> 아래 로직 이용시 selected에 대한 css도 정의해줘야함.
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  
  menus.forEach((wrap) => {
    // console.log(wrap.dataset.type);
    if(filter ==='*' || filter === wrap.dataset.type) {
      wrap.classList.remove('invisible');
    } else {
      wrap.classList.add('invisible');
    }
  });
});

// Menu filtering2 (두번째줄)
const wrapBtncontainer2 = document.querySelector('.menu__categories2');
wrapBtncontainer2.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

    // menu.html Navbar seclect category__btn
    // Remove selection from the previous item and Select the new one  --> 아래 로직 이용시 selected에 대한 css도 정의해줘야함.
    const active = document.querySelector('.category__btn.selected');
    if (active != null) {
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  
  menus.forEach((wrap) => {
    // console.log(wrap.dataset.type);
    if(filter ==='*' || filter === wrap.dataset.type) {
      wrap.classList.remove('invisible');
    } else {
      wrap.classList.add('invisible');
    }
  });
});

// --------------------------------------------------------------------------


const secletOpstions = document.querySelector('.prod-buy__quantity');
secletOpstions.addEventListener('click', (e) => {
  const active = document.querySelector('prod-quantity__form.selected');
    if (active != null) {
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  });

  
  const secletOpstions = document.querySelector('.prod-buy__quantity');
  secletOpstions2.addEventListener('click', (e) => {
    const active2 = document.querySelector('prod-quantity__form.selected');
    if (active2 == null) {
      e.target.classList.add('selected');
    }
    active.classList.remove('selected');
  });



  
