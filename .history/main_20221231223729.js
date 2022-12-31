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

  // Remove selection from the previous item and Select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');
  
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
  
  menus.forEach((wrap) => {
    // console.log(wrap.dataset.type);
    if(filter ==='*' || filter === wrap.dataset.type) {
      wrap.classList.remove('invisible');
    } else {
      wrap.classList.add('invisible');
    }
  });
});

// menu.html Navbar seclect category__btn
// Remove selection from the previous item and Select the new one  --> 아래 로직 이용시 selected에 대한 css도 정의해줘야함.
const active = document.querySelector('.category__btn.selected');
active.classList.remove('selected');
const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
e.target.classList.add('selected');

  
