
export default function StampUsePage({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState,
        count: 0,
        totalPrice: 0
    }
    let basket = [];
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.state.totalPrice = 0;
        basket = [];
        this.state.basket.map(item => {
            this.state.totalPrice += parseInt(item.m_price);
            if(item.m_quantity > 1) {
                for(let i=0; i< item.m_quantity; i++) {
                    basket.push({
                        m_idx: item.m_idx,
                        m_img: item.m_img,
                        m_name: item.m_name,
                        m_options: item.m_options,
                        m_price: item.m_price / parseInt(item.m_quantity),
                        m_quantity: 1
                    })
                }
            }else {
                basket.push({
                    m_idx: item.m_idx,
                    m_img: item.m_img,
                    m_name: item.m_name,
                    m_options: item.m_options,
                    m_price: item.m_price,
                    m_quantity: 1
                })
            }
        });

        


        this.render()
    }

    // 렌더 함수
    this.render = () => {
      
        this.$element = document.querySelector('.optionPopup')
        const basket_arr = [];
        for(let i=0; i<basket.length; i++) {

          if(i > this.state.nth_content -1 && i < this.state.nth_content +4) {
            basket_arr.push(basket[i])
          }
        }
        const empty_basket_arr = [];
        if(basket_arr.length < 4) {
          for(let i=4; i > basket_arr.length; i--) {
            empty_basket_arr.push('')
          }
        }
        if (this.$element) {
            this.$element.innerHTML = `
            <section id="popTitles">
    <div class="pop__title">
      <h2>스탬프 사용</h2>
      <p>선택한 메뉴 중 스탬프를 사용할 메뉴를 선택하여 주세요.</p>
    </div>
  </section>

  <!-- 스탬프 적립하기 / 사용하기 -->
  <section id="popBox">
    <div class="memberStamp">
      <div class="member__stamps">
        <p>010-****-${this.state.mem_mobile.substr(this.state.mem_mobile.length-4, 4)}</p>
        <p class="member__stamp__comment">회원님 총 보유 스탬프</p>
        <p class="have__stamp">${this.state.mem_stamp}개</p>
      </div>
      <div>
        <p>10스탬프 이상부터 10스탬프 단위로 사용 가능</p>
      </div>
    </div>
  </section>

  <section id="useStamp">
    <div class="scheduled__stamp">
      <p>사용 예정 스탬프</p>
      <p class="use_count">0개</p>
    </div>


    <div class="check_menu_box">
      <!-- 상하 arrow btn -->
      <div class="scroll__arrow">
        <div class="arrow_top">
          <i class="fas fa-chevron-up"></i>
        </div>
        <div class="arrow__down">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>

      <!-- 스탬프 사용할 메뉴 선택 -->
      ${basket_arr.map(item => `<div class="select__menu">
      <div class="select_menu_img_container"><img src="../../uploads/${item.m_img}" alt="${item.m_name}"></div>
      
      <div class="select__menu__description">
        <p>${item.m_name}</p>
        <p class="select__price">${parseInt(item.m_price).toLocaleString()}원</p>
        <p class="select__menu__option">${item.m_options.replaceAll(';',' ' )}</p>
      </div>
      <div class="select__menu__checkBox">
        <input type="checkbox" class="select_checkbox">
        <label for="seclet_checkbox">
        </label>
      </div>
    </div>
      `).join('')}
      `
          + `${empty_basket_arr.map(item => `
          <div class="select__menu">

      </div>

          `).join('')}`+
      `
      
      <!-- 공란 -->
    </div>

    <div class="Amount__pay">
      <p>결제 금액</p>
      <p class="Amount__price">${this.state.totalPrice.toLocaleString()}원</p>
    </div>
    <div class="discount">
      <p>할인 금액</p>
      <p class="discount__price">-0원</p>
    </div>
  </section>


  <!-- 취소 / 주문Btn -->
  <section id="pop__bottom">
    <button class="stamp_use_cancel">취소</button>
    <button class="pop__use__Btn">사용</button>
  </section>
        `
        }
    }


    // 이벤트리스너

    $target.addEventListener('click', (e) => {
        // 스탬프사용 체크박스
        if(e.target.closest('div')) {
            if(e.target.closest('div').className == 'select__menu__checkBox') {
                const checkboxes = document.getElementsByClassName('select_checkbox');
                let count = 0;
                for(let i=0; i<checkboxes.length; i++) {
                    if(checkboxes[i].checked) count++;
                }
                if(e.target.closest('div').firstElementChild.checked) {
                    e.target.closest('div').firstElementChild.checked = false;
                    count--;
                }else if(!e.target.closest('div').firstElementChild.checked && count < parseInt(this.state.mem_stamp / 10)){
                    e.target.closest('div').firstElementChild.checked = true;
                    count++;
                }
                
                
                document.querySelector('p.use_count').textContent = `${count*10}개`;
                document.querySelector('p.discount__price').textContent = `-${(count*1500).toLocaleString()}원`;
            }
        }
    })
}
