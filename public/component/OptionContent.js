export default function OptionContent({ initialState, setOptionsState }) {

    //상태관리
    this.state = {
        mo_category: initialState.mo_category,
        mo_content: initialState.mo_content,
        option_price: initialState.option_price,
        selectedOptionMap: new Map(),
        loaded: false,
    };
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        this.render()
        
    }

    // 최상단 요소
    const optionPopup = document.querySelector('.optionPopup');
    this.$element = document.createElement('section');
    this.$element.className = 'options';
    
    optionPopup.appendChild(this.$element)
    const selectedOptionMap = new Map();

    // 렌더 함수
    this.render = () => {
        let arr = this.state.mo_content.split(';')
        let arr2 = [];
        let arr3 = [];
        if(arr.length > 0 && arr[0] != '') {

            for(let i of arr) {
                arr2.push(JSON.parse(i));
            }
            for(let i=arr2.length; i<4; i++) {
                arr3.push('');
            }
        }
        if(optionPopup && !this.state.loaded) {
            if(this.state.mo_category == '') {
                this.$element.innerHTML = `
                <div class="option__discription">
                <h3></h3>
                <ul class="option__text__hiden">
                  <li></li>
                  <li></li>
                </ul>
                <div class="prod-buy__quantity">
                <!-- arrow Btn(양끝 btn) -->
                        <button class="options__arrow__left">
                          
                        </button>
                        <button class="options__arrow__right">
                          
                        </button>
                <div class="prod-quantity__form"></div>
                <div class="prod-quantity__form"></div>
                <div class="prod-quantity__form"></div>
                <div class="prod-quantity__form"></div>
                </div>
                `
            }else {

                // 단일선택
                if(arr2.length > 0) {
                    if(arr2[0].mo_multi == 0) {
                        this.$element.innerHTML = `
                        <div class="option__discription">
                        <h3>${this.state.mo_category}(단일선택)</h3>
                        <ul class="option__text__hiden">
                          <li id="${this.state.mo_category}texthidden"></li>
                          <li id="${this.state.mo_category}pricehidden">0원</li>
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
                            ${arr2.map((item, idx) => 
                                `
                                <div class="prod-quantity__form" data-mo_multi="0">
                                  <p class="quantity__biscriptipn">${item.mo_name}</p>
                                  <p class="quantity__price">+${parseInt(item.mo_price).toLocaleString()}원</p>
                                </div>`
                            ).join('')}
                            ${arr3.map(item => `
                            <div class="prod-quantity__form empty"></div>
                            `).join('')}
                            
                        `
                    }else { // 다중선택
                        this.$element.innerHTML = `
                        <div class="option__discription">
                        <h3>${this.state.mo_category}(다수선택 가능)</h3>
                        <ul class="option__text__hiden">
                          <li id="${this.state.mo_category}texthidden"></li>
                          <li id="${this.state.mo_category}pricehidden">0원</li>
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
                            ${arr2.map((item, idx) => 
                                `
                                <div class="prod-quantity__form" data-mo_multi="1">
                                  <p class="quantity__biscriptipn">${item.mo_name}</p>
                                  <p class="quantity__price">+${parseInt(item.mo_price).toLocaleString()}원</p>
                          
                                  <!-- 옵션 수량 증감Btn -->
                                  <div class="option__plusMinus">
                                    <input type="text" value="1" maxlength="2" autocomplete="off" readonly>
                          
                                    <!-- plus botton -->
                                    <button class="prod-quantity__plus" type="button" data-name="${item.mo_name}">
                                      <i class="fas fa-plus"></i>
                                    </button>
                          
                                    <!-- minus botton -->
                                    <button class="prod-quantity__minus" type="button" data-name="${item.mo_name}">
                                      <i class="fas fa-minus"></i>
                                    </button>
                                  </div>
                                </div>`
                            ).join('')}
                            ${arr3.map(item => `
                            <div class="prod-quantity__form empty"></div>
                            `).join('')}
                            
                        `
                    }
                }
                
            }
           
            this.setState({ loaded: true });
        }
        let selectedArr = [];
        let price = 0;
        this.state.selectedOptionMap.forEach((el, key) => {
            if(el > 1) {
                selectedArr.push(key + "(" + el + ")")
            }else selectedArr.push(key)
            for(let i=0; i<arr2.length; i++) {
                if(key == arr2[i].mo_name) {
                    price += arr2[i].mo_price*el;
                }
            }
        })
        // 부분렌더링
        if(optionPopup && this.state.loaded && selectedArr.length >= 0) {
            const li = document.getElementById(`${this.state.mo_category}texthidden`);
            const li_price = document.getElementById(`${this.state.mo_category}pricehidden`);
            if(li) li.textContent = `${selectedArr.map(key => `${key}`).join(', ')}`;
            if(li_price) li_price.textContent = `${price.toLocaleString()}원`;
        }
        
        
    }
    
    this.render();
    
    // 이벤트리스너
    this.$element.addEventListener('click', (e) => {
        
        if(e.target.closest('div').classList.contains('prod-quantity__form') && !e.target.closest('div').classList.contains('empty')) {
            const target = e.target.closest('div');
            if(target.classList.contains('selected')) {
                if(target.dataset.mo_multi == 0) {
                    target.classList.remove('selected');
                    target.lastElementChild.previousElementSibling.style.top = '35px';     
                    selectedOptionMap.delete(`${target.firstElementChild.innerText}`);
                }else {
                    target.classList.remove('selected');
                    target.lastElementChild.previousElementSibling.style.top = '35px';
                    if(target.lastElementChild.firstElementChild) target.lastElementChild.firstElementChild.value = 1;
                    target.lastElementChild.style.visibility = 'hidden';         
                    selectedOptionMap.delete(`${target.firstElementChild.innerText}`);
                }

            }else {
                if(target.dataset.mo_multi == 0) {
                    for(let i=0; i< target.parentElement.children.length; i++) {
                        if(target.parentElement.children[i].classList.contains('selected')) {
                            target.parentElement.children[i].classList.remove('selected');
                            selectedOptionMap.delete(`${target.parentElement.children[i].firstElementChild.innerText}`);
                        }
                    }
                    target.classList.add('selected');
                    target.lastElementChild.previousElementSibling.style.top = '0';
                    target.lastElementChild.style.visibility = 'visible';
                    selectedOptionMap.set(`${target.firstElementChild.innerText}`, 1);
                }else {
                    target.classList.add('selected');
                    target.lastElementChild.previousElementSibling.style.top = '0';
                    target.lastElementChild.style.visibility = 'visible';
                    selectedOptionMap.set(`${target.firstElementChild.innerText}`, 1);
                }

            }
            this.setState({
                selectedOptionMap: selectedOptionMap
            })
            setOptionsState({ option_price: 123 })
            return;
        }

        if(e.target.closest('button').className == 'prod-quantity__plus') {
            e.target.closest('button').parentNode.firstElementChild.value++;
            selectedOptionMap.set(e.target.closest('button').dataset.name, selectedOptionMap.get(e.target.closest('button').dataset.name) + 1);
            this.setState({
                selectedOptionMap: selectedOptionMap
            })
            setOptionsState({ option_price: 123 })
        }else if(e.target.closest('button').className == 'prod-quantity__minus') {
            if(e.target.closest('button').parentNode.firstElementChild.value > 1) {
                e.target.closest('button').parentNode.firstElementChild.value--;
                selectedOptionMap.set(e.target.closest('button').dataset.name, selectedOptionMap.get(e.target.closest('button').dataset.name) - 1);
                this.setState({
                    selectedOptionMap: selectedOptionMap
                })
            }
            setOptionsState({ option_price: 123 })
        }
        
        e.stopPropagation();
    })
}
