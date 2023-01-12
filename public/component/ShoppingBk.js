export default function ShoppingBk({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState,
        total_price: '0',
        total_quantity: '0',

    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    this.$element = document.createElement('section');
    this.$element.id = 'shoppingBk';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
      
      if(this.state.basket.length == 0) {
        this.$element.innerHTML = `
        <div class="shopping__basket">
        <div class="BK__icon">
          <i class="fas fa-file-invoice"></i>
        </div>
        <!-- 장바구니 list -->
        <div id="Bk__list">

        </div>


        <!-- 상하 arrow btn -->
        <div class="shoppigBk__scroll__arrow">
          <div class="shoppigBk__arrow_top">
            <i class="fas fa-chevron-up"></i>
          </div>
          <div class="shoppigBk__arrow__down">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

  <div class="count">
    <ul class="count___oders">
      <li class="quantity">
        주문수량
        <span>0</span>
      </li>
      <li class="total___order___amount">
        총 주문금액
      </li>
      <li class="total___order___won">0
        <span class="won">원</span>
      </li>
    </ul>
  </div>

  <!-- payment -->
  <div class="pay">
    <button class="cancel___btn">
      <i class="fas fa-times-circle"></i>
      <span class="cancel__all">전체취소</span>
    </button>
    <button class="payment___btn">
      결제하기
    </button>
  </div>
        `
      }else {
        const basket_arr = [];
        for(let i=0; i<this.state.basket.length; i++) {
          this.state.total_price = parseInt(this.state.total_price) + parseInt(this.state.basket[i].m_price);
          this.state.total_quantity = parseInt(this.state.total_quantity) + parseInt(this.state.basket[i].m_quantity);
          if(i > this.state.nth_content -1 && i < this.state.nth_content +3) {
            basket_arr.push(this.state.basket[i])
          }
        }


        this.$element.innerHTML = `
        <div class="shopping__basket">
        <!-- 장바구니 list -->
        <div class="BK__icon"></div>
        <div id="Bk__list">
        ${basket_arr.map((item, idx) => `
        <div class="Bk__select__list">
            <button class="cancel___btn" data-idx="${this.state.nth_content + idx}">
              <i class="fas fa-times-circle"></i>
            </button>
            <div class="Bk__list__menuName">
              <p>${item.m_name}</p>
              <p class="Bk__list__menuName__option">${item.m_options != '' ? item.m_options.replaceAll(';',' ').replaceAll(',','') : "옵션없음"}</p>
            </div>
            <div class="Bk__list__price">
              <p>${item.m_price.toLocaleString()}원</p>
            </div>
            <div class="plusMinus" >
              <input type="text" value="${item.m_quantity}" autocomplete="off">
              <button class="showMenu__minus__btn" data-idx="${item.m_idx}">
                <i class="fas fa-minus" aria-hidden="true"></i>
              </button>
              <button class="showMenu__plus__btn" data-idx="${item.m_idx}">
                <i class="fas fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        `).join('')}
        </div>
          


        <!-- 상하 arrow btn -->
        <div class="shoppigBk__scroll__arrow">
          <div class="shoppigBk__arrow_top">
            <i class="fas fa-chevron-up"></i>
          </div>
          <div class="shoppigBk__arrow__down">
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

  <div class="count">
    <ul class="count___oders">
      <li class="quantity">
        주문수량
        <span>${this.state.total_quantity}</span>
      </li>
      <li class="total___order___amount">
        총 주문금액
      </li>
      <li class="total___order___won">
        <span class="won">${this.state.total_price.toLocaleString()}원</span>
      </li>
    </ul>
  </div>

  <!-- payment -->
  <div class="pay">
    <button class="cancel___btn cancel_all">
      <i class="fas fa-times-circle"></i>
      <span class="cancel__all">전체취소</span>
    </button>
    <button class="payment___btn">
      결제하기
    </button>
  </div>
        `
      }
        
    }
    
    this.render()

    // 이벤트리스너

    this.$element.addEventListener('click', (e) => {
      
    })

}
