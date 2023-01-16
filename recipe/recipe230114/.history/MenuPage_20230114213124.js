import orderNum from '../practice/component/orderNum';

export default function MenuPage({ $target, initialState }) {
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

    // 렌더 함수
    this.render = () => {

        // 최상단 요소
        this.$element = document.createElement('div');
        this.$element.className = 'section__container';
        document.getElementById('work').appendChild(this.$element);
        const section__container = document.querySelector('.section__container');

        new orderNum({
            $target,
            initialState: this.state
        }).render();
        

        new ShoppingBk({
            $target: $target,
            initialState: { 
                basket: this.state.basket,
                nth_content: this.state.nth_content
            }
        })
    }
    
    this.render()

    // // 이벤트리스너
    // this.$element.addEventListener('click', (e) => {

    // })
}
