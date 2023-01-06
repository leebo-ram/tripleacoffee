export default function OptionContent({ $target, initialState }) {

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
    this.$element.className = 'options';
    
    $target.appendChild(this.$element)

    // 렌더 함수
    this.render = () => {
        let arr = this.state.mo_content.split(';')
        let arr2 = [];
        let arr3 = [];
        for(let i of arr) {
            arr2.push(JSON.parse(i));
        }
        for(let i=arr2.length; i<4; i++) {
            arr3.push('');
        }
        this.$element.innerHTML = `
        <div class="option__discription">
        <h3>${this.state.mo_category}</h3>
        <ul class="option__text__hiden">
          <li>hiden option name - ex)바닐라시럽추가</li>
          <li> ~원</li>
        </ul>
      </div>
        <div class="prod-buy__quantity">

                <!-- arrow Btn(양끝 btn) -->
                <button class="options__arrow__left">
                  <i class="fas fa-caret-left"></i>
                </button>
                <button class="options__arrow__right">
                  <i class="fas fa-caret-right"></i>
                </button>
            ${arr2.map(item => 
                `
                <div class="prod-quantity__form">
                  <p class="quantity__biscriptipn">${item.mo_name}</p>
                  <p class="quantity__price">+${item.mo_price}원</p>
          
                  <!-- 옵션 수량 증감Btn -->
                  <div class="option__plusMinus">
                    <input type="text" value="1" maxlength="2" autocomplete="off">
          
                    <!-- plus botton -->
                    <button class="prod-quantity__plus" type="button">
                      <i class="fas fa-plus"></i>
                    </button>
          
                    <!-- minus botton -->
                    <button class="prod-quantity__minus" type="button">
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                </div>`
            ).join('')}
            ${arr3.map(item => `
            <div class="prod-quantity__form"></div>
            `).join('')}
            
        `
    }
    
    this.render()

    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {

    })
}
