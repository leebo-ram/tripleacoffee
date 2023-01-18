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

    this.$element = document.createElement('section');
    this.$element.id = 'recipe';

    $target.appendChild(this.$element);

    this.render = () => {
        this.$element.innerHTML = `
            <div class="orderNum_box">
            <h3>교환번호</h3>
            <div class="orderNum">
                ${this.state.data.map((item, index) => `
                    <div class="orderNum__list ${index == this.state.choosedOrder ? 'selected': ''}" data-index="${index}">
                        <span class="orderNum__list__posNum"> POS: 01 </span>
                        <time datetime="${item.orderDate}">
                            [주문시간] ${item.orderDate}
                        </time>
                        <p> 교환번호: ${item.orderIndex}
                            <span class="orderNum__list__store">(${item.choosedOrder})
                            </span>
                        </p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    this.render()

    this.$element.addEventListener('click', (e) => {

    })

}