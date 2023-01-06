export default function OptionShowMenu({ $target, initialState }) {

    //상태관리
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
    }

    // 최상단 요소
    this.$element = document.createElement('section');
    this.$element.id = 'showMenu';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
        <div class="show__menu">
        <img class="showMenu__img" src="../uploads/${this.state.m_img}" alt="${this.state.m_name}" />
      </div>
  
      <div class="showMenu__description">
        <p>${this.state.m_name}</p>
        <p class="showMenu__description_price">${this.state.m_price}</p>
        <p>hiden ex)바닐라시럽추가, 연하게</p>
      </div>
  
      <!-- 선택한 메뉴 수량 증감Btn -->
      <div class="plusMinus">
        <input type="text" value="1" maxlength="2" autocomplete="off">
  
        <button class="showMenu__minus__btn">
          <i class="fas fa-minus"></i>
        </button>
  
        <button class="showMenu__plus__btn">
          <i class="fas fa-plus"></i>
        </button>
      </div>
        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
