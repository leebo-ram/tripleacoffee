export default function BottomArrow({ $target, initialState }) {

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
    const wrap___list = document.querySelector('.wrap___list');
    this.$element = document.createElement('div')
    this.$element.id = 'arrow';
    
    wrap___list.appendChild(this.$element);

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
        <div class="arrow___bottoms">
        <button class="arrow___bottom">
          <i class="fas fa-chevron-left"></i>
        </button>

        <!-- arrow right -->
        <button class="arrow___right arrow___bottom">
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- minimize_bar -->
        <ul class="minimize">
          <li>
            <a href="">
              <img src="../img/btn/btn_bar_off.png" alt="minimize_bar">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../img/btn/btn_bar_off.png" alt="minimize_bar">
            </a>
          </li>
        </ul>
      </div>
        `
    }
    
    this.render()

    // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
