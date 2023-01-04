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
    if($target) $target.appendChild(this.$element);

    // 렌더 함수
    this.render = () => {
        this.$element.innerHTML = `
        <button class="category__btn active selected" data-filter="*">All</button>
        <button class="category__btn" data-filter="coffee">COFFEE</button>
        <button class="category__btn" data-filter="nonCoffee">NONCOFFEE</button>
        <button class="category__btn" data-filter="bottle">BOTTLE</button>
        <button class="category__btn" data-filter="adeFrappe">ADE/FRAPPE</button>
        <button class="category__btn" data-filter="smoothieShake">SMOOTHIE/SHAKE</button>
        <button class="category__btn" data-filter="juiceTea">JUICE/TEA</button>
        <button class="category__btn" data-filter="signatureLatte">SIGNATURELATTE</button>
        <button class="category__btn" data-filter="dessertWaffle">DESSERT/WAFFLE</button>
        <button class="category__btn" data-filter="bakery">BAKERY</button>
        `
    }
    
    this.render()

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
