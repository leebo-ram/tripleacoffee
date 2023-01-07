export default function ShoppingBk({ $target, initialState }) {

    //상태관리
    this.state = {
        ...initialState
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
      console.log(this.state)
        this.$element.innerHTML = `
        <div class="shopping__basket">
        <i class="fas fa-file-invoice"></i>
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
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
