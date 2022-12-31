'use strict';

// -------------------------------------------------


// 아래 코드는 options.html의 옵션을 선택시에 강조표시하는 코드인데 첫째줄에만 선택이 되고 선택취소는 되지 않는다.
const secletOpstions = document.querySelector('.prod-buy__quantity');
secletOpstions.addEventListener('click', (e) => {
  const active2 = document.querySelector('prod-quantity__form.selected');
    if (active2 == null) {
      console.log('출력해줘');
      e.target.classList.add('selected');
    }
    active2.classList.remove('selected');
  });



  
