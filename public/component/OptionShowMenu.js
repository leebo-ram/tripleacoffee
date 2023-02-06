export default function OptionShowMenu({ initialState }) {

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

    // 렌더 함수
    this.render = () => {
      const optionPopup = document.querySelector('.optionPopup')

      if(optionPopup) {
        if(!this.state.loaded) {
          this.$element = document.createElement('section');
          this.$element.id = 'showMenu';
          
          optionPopup.appendChild(this.$element)
          this.setState({ loaded: true })
        }
        const m_price = parseInt(this.state.m_price)*parseInt(this.state.quantity);
        this.$element.innerHTML = `
        <div class="show__menu">
        <img class="showMenu__img" src="../uploads/${this.state.m_img}" alt="${this.state.m_name}" />
      </div>
  
      <div class="showMenu__description">
        <p>${this.state.m_name}</p>
        <p class="showMenu__description_price">${parseInt(m_price).toLocaleString()}원</p>
        <p>${this.state.optionstr}</p>
      </div>
  
      <!-- 선택한 메뉴 수량 증감Btn -->
      <div class="plusMinus">
        <input type="text" value="${this.state.quantity}" id="option_show_input" autocomplete="off" readonly>
  
        <button class="showMenu__minus__btn">
          <i class="fas fa-minus"></i>
        </button>
  
        <button class="showMenu__plus__btn">
          <i class="fas fa-plus"></i>
        </button>
      </div>
        `
      }

    }
    

    // 이벤트리스너
    window.addEventListener('click', (e) => {
      const target = document.getElementById('option_show_input');
      if(e.target.closest('button')) {
        if(e.target.closest('button').className == 'showMenu__plus__btn') {
          target.value++;
          console.log(target.value)
          this.setState({ quantity: target.value })
          return;
        }else if (e.target.closest('button').className == 'showMenu__minus__btn') {
          if(target.value > 1) target.value--;
          console.log(target.value)
          this.setState({ quantity: target.value })
          return;
      } 
      }

    //   } else if(e.target.closest('button').className == 'prod-quantity__plus') {
    //     console.log("+")
    //     console.log(e.target.closest('button').firstElementChild.value);
    //     const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    //     console.log(target);
    //     target.value ++;
    // }else if (e.target.closest('button').className == 'prod-quantity__minus') {
    //     console.log('-')
    //     const target = document.getElementById(`${e.target.closest('button').firstElementChild.value}`);
    //     console.log(target);
    //     target.value --;
    //   }
    })
}
