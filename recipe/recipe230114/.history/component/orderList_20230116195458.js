export default function Orderlist({ $target }) {
  //상태관리
  this.state = {
      data: '',
  };
  this.setState = (nextState) => {
      this.state = {
          ...this.state,
          ...nextState,
      };
      this.render();
  };

  // 최상단 요소
  this.$element = document.createElement('div');
  this.$element.className = 'recipe_wrap';

  $target.appendChild(this.$element);

  // 렌더 함수
  this.render = () => {

      if (this.state.data != '') {
          this.$element.innerHTML = `
          <div class="orderList_box">
          <h3>주문목록 <span class="orderList__count">총 5건</span>
            <h3>
              <div class="orderList">

              ${this.state.data.map(item => `
                <div class="order__menu">
                  <p class="order__menu__name">${item.orderList[0].name} <span>${item.orderList[0].quantity}</span></p>
                  <ul class="order__menu__option">
                  <li>
                  ▶ ${item.orderList[0].optionName} 
                  <!-- <span>${item.options[0].optionQuantity} </span> -->
                </li>
                <li>▶ ${item.options[0].optionName} <span>${item.options[0].optionQuantity}</span></li>
                <li>▶ ${item.options[0].optionName} <span>${item.options[0].optionQuantity}</span></li>
              </ul>

    
                  <!-- 주문 목록 완료 Btn -->
                  <div class="order__menu__btn">
                    <div class="order__menu__cancel__btn order__menuBtns">
                      <p>해제</p>
                     </div>
                     <div class="order__menu__complete__btn order__menuBtns">
                       <p>마침</p>
                     </div>
                  </div>
                  
                </div>

          `
                  )
                  .join('')}

          </div>
          </div>
          
          `;

      } else {
          this.$element.innerHTML = `
          // 데이터 불러오기 실패. 
      `;
      }
  };

  const json_import = async () => {
      let data = '';
      await fetch('../Dummy.json')
          .then((res) => res.json())
          .then((res) => (data = res));

      console.log(data);
      this.setState({
          data: data,
      });
  };

  this.render();
  json_import();
  // 이벤트리스너
  this.$element.addEventListener('click', (e) => {
    console.log(e.target);
    // 해제 btn 단, 연속적인 선택 불가
    if (e.target.closest('div')) {
      if (e.target.closest('div').classList.contains('order__menuBtns')) {
          const active = document.querySelector(
              '.order__menuBtns.selected'
          );
          if (active != null) {
              active.classList.remove('selected');
          }
          if (!e.target.closest('div').classList.contains('selected')) {
              e.target.closest('div').classList.add('selected');
          }
          return;
      }
  }
  });
}
