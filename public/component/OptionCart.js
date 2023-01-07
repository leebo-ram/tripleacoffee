export default function OptionCart({ $target, initialState }) {

    //상태관리
    this.state = {
        $target,
        initialState
    }
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소


    // 렌더 함수
    this.render = () => {
        const optionPopup = document.querySelector('.optionPopup');
        if(optionPopup) {
            this.$element = document.createElement('section');
            this.$element.id = 'carts';
            
            optionPopup.appendChild(this.$element)
            this.$element.innerHTML = `
            <div class="cart">
            <a>
              <button class="cart_btn cart__cancel__Btn">취소</button>
            </a>
          </div>
          <div class="cart">
            <button class="cart_btn cart__ok__Btn">메뉴담기</button>
          </div>
            `
        }

    }
    
    this.render()

    // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
