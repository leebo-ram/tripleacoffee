'use strict';

// -------------------------------------------------


const secletOpstions = document.querySelector('.prod-buy__quantity');
secletOpstions.addEventListener('click', (e) => {
  const active = document.querySelector('prod-quantity__form.selected');
    if (active == null) {
      console.log('aaa');
      e.target.classList.add('selected');
    }
    active.classList.remove('selected');
  });




  