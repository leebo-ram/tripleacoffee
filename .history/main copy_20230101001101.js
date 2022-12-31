'use strict';

// -------------------------------------------------


const secletOpstions = document.querySelector('.prod-buy__quantity');
secletOpstions.addEventListener('click', (e) => {
  const active = document.querySelector('prod-quantity__form.selected');
    if (active != null) {
      console.log('aaa');
      active.classList.remove('selected');
    }
    e.target.classList.add('selected');
  });




  
