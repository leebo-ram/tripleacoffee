export default function OrderNum({ $target, initialState }) {
    this.state = {
        ...initialState,
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        }  
        console.log('orderNUm 컴포넌트')
        console.log(this.state.data)

        this.render()
    }

    this.$element = document.querySelector('#recipe');
    this.$element2 = document.createElement('div');
    this.$element2.className = 'orderNum_box';
    this.$element.appendChild(this.$element2)
    this.render = () => {
        console.log(this.state.choosedOrder)
        this.$element2.innerHTML = `

            <h3>교환번호</h3>
            <div class="orderNum">
                ${this.state.data.map((item, index) => `
                    <div class="orderNum__list ${index == this.state.choosedOrder ? 'selected': ''}" data-index="${index}">
                        <span class="orderNum__list__posNum"> POS: 01 </span>
                        <time datetime="${item.orderDate}">
                            [주문시간] ${item.orderDate}
                        </time>
                        <p> 교환번호: ${item.orderIndex}
                            <span class="${item.choosedOrder == '매장' ? 'orderNum__list__store':'orderNum__list__packaging'}">(${item.choosedOrder})
                            </span>
                        </p>
                    </div>
                `).join('')}
                ${this.state.completedData.map((item, index) => `
                <div class="orderNum__list completed ${this.state.data.length + index == this.state.choosedOrder ? 'selected': ''}" data-index="${this.state.data.length + index}">
                <span class="orderNum__list__posNum"> POS: 01 </span>
                <time datetime="${item.orderDate}">
                    [주문시간] ${item.orderDate}
                </time>
                <p> 교환번호: ${item.orderIndex}
                    <span class="${item.choosedOrder == '매장' ? 'orderNum__list__store':'orderNum__list__packaging'}">(${item.choosedOrder})
                    </span>
                </p>
            </div>
                `).join('')}
        `;
    }

    this.render()

    this.$element.addEventListener('click', (e) => {

    })

}