export default function MenuCategory({ $target, initialState }) {

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
    this.$element = document.createElement('div');
    this.$element.className = 'menu__categories';
    this.$element.style = 'text-align: center;'
    $target.appendChild(this.$element);

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
        <button class="category__btn active selected" data-filter="COFFEE">COFFEE</button>
        <button class="category__btn" data-filter="NON_COFFEE">NONCOFFEE</button>
        <button class="category__btn" data-filter="BOTTLE">BOTTLE</button>
        <button class="category__btn" data-filter="ADE & FRAPPE">ADE/FRAPPE</button>
        <button class="category__btn" data-filter="SMOOTHIE & SHAKE">SMOOTHIE/SHAKE</button>
        <button class="category__btn" data-filter="JUICE& TEA">JUICE/TEA</button>
        <button class="category__btn" data-filter="Signature Latte">SIGNATURELATTE</button>
        <button class="category__btn" data-filter="Dessert & Waffle">DESSERT/WAFFLE</button>
        <button class="category__btn" data-filter="Bakery">BAKERY</button>
        <button class="category__btn" data-filter="COFFEEBEAN">COFFEEBEAN</button>
        `
    }
    
    this.render()

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
