// Menu filtering
const wrapBtncontainer = document.querySelector('.menu__categories');
const menucontainer = document.querySelector('.wrap___list');
const menus = document.querySelectorAll('.wrap');
wrapBtncontainer.addEventListener('click', (e) => {
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

