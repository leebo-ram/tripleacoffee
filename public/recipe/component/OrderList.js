
export default function OrderList({ $target, initialState }) {
    this.state = {
        ...initialState,
    }

    this.setState = (nextState) => {
        if(this.state.orderData == nextState.orderData) {
            this.state = {
                ...this.state,
                ...nextState,
            }
        }else {

            this.state = {
                ...this.state,
                ...nextState,
            }
            this.render();
        }
        
    }

    this.$element = document.createElement('div');
    this.$element.className = 'orderList_box';

    // $target.appendChild(this.$element);
    this.$element2 = document.querySelector('#recipe');
    this.$element2.appendChild(this.$element)

    this.render = () => {
        if(this.state.orderData) {

            this.$element.innerHTML = `
                <h3>주문목록 <span class="orderList__count">총 ${this.state.orderData.order.length}건</span></h3>
                <div class="orderList">
                    ${this.state.orderData.order.map((item, index) => `
                        <div class="order__menu ${this.state.choosedMenu.indexOf(index) == -1 ? '':'selected'} ${item.done ? 'completed':""}" data-index="${index}">
                            <p class="order__menu__name">${item.m_name}<span>${item.m_quantity}개</span></p>
                            <ul class="order__menu__option">` + `
                                ${item.m_options.map(item2 => `
                                    <li>
                                        ▶ ${item2.name}
                                        <span>${item2.quantity}개</span>
                                    </li>
                                `).join('')} `+`

                            </ul>

                            <!-- 주문 목록 완료 Btn -->
                            <div class="order__menu__btn">
                                <div class="order__menu__complete__btn order__menuBtns ${item.done ? 'completed':""}" data-index="${index}">
                                    <p>${item.done ? "제조":"마침"}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    

                </div>
            `;
        }else {
            this.$element.innerHTML = `
            <h3>주문목록 <span class="orderList__count">총 0건</span></h3>
            <div class="orderList">
            </div>
        `;
        }
        
    }

    this.render();


}